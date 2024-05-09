import { getCurrentHub, startTransaction } from '@sentry/browser';
import { handleAuthErrors } from 'app/accounts/actions';
import { DestinyAccount } from 'app/accounts/destiny-account';
import { getPlatforms } from 'app/accounts/platforms';
import { currentAccountSelector } from 'app/accounts/selectors';
import { loadClarity } from 'app/clarity/descriptions/loadDescriptions';
import { customStatsSelector } from 'app/dim-api/selectors';
import { t } from 'app/i18next-t';
import { processInGameLoadouts } from 'app/loadout-drawer/loadout-type-converters';
import { inGameLoadoutLoaded } from 'app/loadout/ingame/actions';
import { loadCoreSettings } from 'app/manifest/actions';
import { d2ManifestSelector, manifestSelector } from 'app/manifest/selectors';
import { loadingTracker } from 'app/shell/loading-tracker';
import { get, set } from 'app/storage/idb-keyval';
import { ThunkResult } from 'app/store/types';
import { DimError } from 'app/utils/dim-error';
import { convertToError, errorMessage } from 'app/utils/errors';
import { errorLog, infoLog, timer, warnLog } from 'app/utils/log';
import { DestinyProfileResponse } from 'bungie-api-ts/destiny2';
import { getCharacters as d1GetCharacters } from '../bungie-api/destiny1-api';
import { getCharacters, getStores } from '../bungie-api/destiny2-api';
import { bungieErrorToaster } from '../bungie-api/error-toaster';
import { D2ManifestDefinitions, getDefinitions } from '../destiny2/d2-definitions';
import { bungieNetPath } from '../dim-ui/BungieImage';
import { showNotification } from '../notifications/notifications';
import { reportException } from '../utils/sentry';
import {
  CharacterInfo,
  charactersUpdated,
  error,
  loadNewItems,
  profileError,
  profileLoaded,
  update,
} from './actions';
import { cleanInfos } from './dim-item-info';
import { d2BucketsSelector, storesLoadedSelector, storesSelector } from './selectors';
import { DimStore } from './store-types';
import { getCharacterStatsData as getD1CharacterStatsData } from './store/character-utils';
import { buildStores, getCharacterStatsData } from './store/d2-store-factory';
import { resetItemIndexGenerator } from './store/item-index';
import { getCurrentStore } from './stores-helpers';

/**
 * Update the high level character information for all the stores
 * (level, power, stats, etc.). This does not update the
 * items in the stores.
 *
 * This works on both D1 and D2.
 *
 * TODO: Instead of this, update per-character after equip/dequip
 */
export function updateCharacters(): ThunkResult {
  return async (dispatch, getState) => {
    const account = currentAccountSelector(getState());
    if (!account) {
      return;
    }

    const defs = manifestSelector(getState());
    if (!defs) {
      return;
    }

    let characters: CharacterInfo[] = [];
    if (account.destinyVersion === 2) {
      const profileInfo = await getCharacters(account);
      characters = profileInfo.characters.data
        ? Object.values(profileInfo.characters.data).map((character) => ({
            characterId: character.characterId,
            level: character.levelProgression.level,
            powerLevel: character.light,
            background: bungieNetPath(character.emblemBackgroundPath),
            icon: bungieNetPath(character.emblemPath),
            stats: getCharacterStatsData(d2ManifestSelector(getState())!, character.stats),
            color: character.emblemColor,
          }))
        : [];
    } else {
      const profileInfo = await d1GetCharacters(account);
      characters = profileInfo.characters.map((character) => {
        const characterBase = character.characterBase;
        return {
          characterId: characterBase.characterId,
          level: character.characterLevel,
          powerLevel: characterBase.powerLevel,
          percentToNextLevel: character.percentToNextLevel / 100,
          background: bungieNetPath(character.backgroundPath),
          icon: bungieNetPath(character.emblemPath),
          stats: getD1CharacterStatsData(getState().manifest.d1Manifest!, characterBase),
        };
      });
    }

    // If we switched account since starting this, give up
    if (account !== currentAccountSelector(getState())) {
      return;
    }

    dispatch(charactersUpdated(characters));
  };
}

let firstTime = true;

/**
 * Returns a promise for a fresh view of the stores and their items.
 */
export function loadStores(): ThunkResult<DimStore[] | undefined> {
  return async (dispatch, getState) => {
    let account = currentAccountSelector(getState());
    if (!account) {
      // TODO: throw here?
      await dispatch(getPlatforms);
      account = currentAccountSelector(getState());
      if (!account || account.destinyVersion !== 2) {
        return;
      }
    }

    dispatch(loadCoreSettings()); // no need to wait
    $featureFlags.clarityDescriptions && dispatch(loadClarity()); // no need to await
    await dispatch(loadNewItems(account));
    // The first time we load, allow the data to be loaded from IDB. We then do a second
    // load to make sure that we immediately try to get remote data.
    if (firstTime) {
      await dispatch(loadStoresData(account, firstTime));
      firstTime = false;
    }
    const stores = await dispatch(loadStoresData(account, firstTime));
    return stores;
  };
}

/** time in milliseconds after which we could expect Bnet to return an updated response */
const BUNGIE_CACHE_TTL = 15_000;
/** How old the profile can be and still trigger cleanup of tags. */
const FRESH_ENOUGH_TO_CLEAN_INFOS = 90_000; // 90 seconds

let minimumCacheAge = Number.MAX_SAFE_INTEGER;

function loadProfile(
  account: DestinyAccount,
  firstTime: boolean,
): ThunkResult<
  | {
      profile: DestinyProfileResponse;
      /** Whether the data is from a "live", remote Bungie.net response. false if this is cached data. */
      live: boolean;
      readOnly?: boolean;
    }
  | undefined
> {
  return async (dispatch, getState) => {
    const mockProfileData = getState().inventory.mockProfileData;
    if (mockProfileData) {
      return { profile: mockProfileData, live: false, readOnly: true };
    }

    // First try loading from IndexedDB
    let cachedProfileResponse = getState().inventory.profileResponse;
    if (!cachedProfileResponse) {
      try {
        cachedProfileResponse = await get<DestinyProfileResponse>(
          `profile-${account.membershipId}`,
        );
        // Check to make sure the profile hadn't been loaded in the meantime
        if (getState().inventory.profileResponse) {
          cachedProfileResponse = getState().inventory.profileResponse;
        } else {
          infoLog('d2-stores', 'Loaded cached profile from IndexedDB');
          dispatch(profileLoaded({ profile: cachedProfileResponse, live: false }));
          // The first time we load, just use the IDB version if we can, to speed up loading
          if (firstTime) {
            return { profile: cachedProfileResponse, live: false };
          }
        }
      } catch (e) {
        errorLog('d2-stores', 'Failed to load profile response from IDB', e);
      }
    }

    let cachedProfileMintedDate = new Date(0);

    // If our cached profile is up to date
    if (cachedProfileResponse) {
      // TODO: need to make sure we still load at the right frequency / for manual cache busts?
      cachedProfileMintedDate = new Date(cachedProfileResponse.responseMintedTimestamp ?? 0);
      const profileAge = Date.now() - cachedProfileMintedDate.getTime();
      if (!storesLoadedSelector(getState()) && profileAge > 0 && profileAge < BUNGIE_CACHE_TTL) {
        warnLog(
          'd2-stores',
          'Cached profile is within Bungie.net cache time, skipping remote load.',
          profileAge,
        );
        return { profile: cachedProfileResponse, live: false };
      } else {
        infoLog(
          'd2-stores',
          `Cached profile is older (${profileAge / 1000}s) than Bungie.net cache time (${BUNGIE_CACHE_TTL / 1000})s, proceeding.`,
          profileAge,
        );
      }
    }

    try {
      const remoteProfileResponse = await getStores(account);
      const remoteProfileMintedDate = new Date(remoteProfileResponse.responseMintedTimestamp ?? 0);
      const remoteProfileAgeSecs = (Date.now() - remoteProfileMintedDate.getTime()) / 1000;
      infoLog(
        'd2-stores',
        `Profile from Bungie.net is ${remoteProfileAgeSecs}s newer than cached profile, using it.`,
      );

      // compare new response against cached response, toss if it's not newer!
      if (cachedProfileResponse) {
        if (remoteProfileMintedDate.getTime() <= cachedProfileMintedDate.getTime()) {
          const ageSecs =
            (cachedProfileMintedDate.getTime() - remoteProfileMintedDate.getTime()) / 1000;
          warnLog(
            'd2-stores',
            `Profile from Bungie.net was ${ageSecs}s older than cached profile, discarding.`,
            remoteProfileMintedDate,
            cachedProfileMintedDate,
          );
          // Clear the error since we did load correctly
          dispatch(profileError(undefined));
          // undefined means skip processing, in case we already have computed stores
          return storesLoadedSelector(getState())
            ? undefined
            : { profile: cachedProfileResponse, live: false };
        } else {
          minimumCacheAge = Math.min(
            minimumCacheAge,
            remoteProfileMintedDate.getTime() - cachedProfileMintedDate.getTime(),
          );
          const ageSecs =
            (remoteProfileMintedDate.getTime() - cachedProfileMintedDate.getTime()) / 1000;
          infoLog(
            'd2-stores',
            `Profile from Bungie.net was ${ageSecs} newer than cached profile, using it.`,
            minimumCacheAge,
            remoteProfileMintedDate,
            cachedProfileMintedDate,
          );
        }
      }

      set(`profile-${account.membershipId}`, remoteProfileResponse); // don't await
      dispatch(profileLoaded({ profile: remoteProfileResponse, live: true }));
      return { profile: remoteProfileResponse, live: true };
    } catch (e) {
      dispatch(handleAuthErrors(e));
      dispatch(profileError(convertToError(e)));
      if (cachedProfileResponse) {
        errorLog(
          'd2-stores',
          'Error loading profile from Bungie.net, falling back to cached profile',
          e,
        );
        // undefined means skip processing, in case we already have computed stores
        return storesLoadedSelector(getState())
          ? undefined
          : { profile: cachedProfileResponse, live: false };
      }
      // rethrow
      throw e;
    }
  };
}

function loadStoresData(
  account: DestinyAccount,
  firstTime: boolean,
): ThunkResult<DimStore[] | undefined> {
  return async (dispatch, getState) => {
    const promise = (async () => {
      // If we switched account since starting this, give up
      if (account !== currentAccountSelector(getState())) {
        return;
      }

      const transaction = startTransaction({ name: 'loadStoresD2' });
      // set the transaction on the scope so it picks up any errors
      getCurrentHub()?.configureScope((scope) => scope.setSpan(transaction));

      resetItemIndexGenerator();

      try {
        const [defs, profileInfo] = await Promise.all([
          dispatch(getDefinitions()),
          dispatch(loadProfile(account, firstTime)),
        ]);

        // If we switched account since starting this, give up
        if (account !== currentAccountSelector(getState())) {
          return;
        }

        if (!defs || !profileInfo) {
          return;
        }

        const { profile: profileResponse, live, readOnly } = profileInfo;

        const stopTimer = timer('Process inventory');

        const buckets = d2BucketsSelector(getState())!;
        const customStats = customStatsSelector(getState());
        const stores = buildStores(
          {
            defs,
            buckets,
            customStats,
            profileResponse,
          },
          transaction,
        );

        if (readOnly) {
          for (const store of stores) {
            store.hadErrors = true;
            for (const item of store.items) {
              item.lockable = false;
              item.trackable = false;
              item.notransfer = true;
              item.taggable = false;
            }
          }
        }

        const currencies = processCurrencies(profileResponse, defs);

        const loadouts = processInGameLoadouts(profileResponse, defs);

        stopTimer();

        const stateSpan = transaction?.startChild({
          op: 'updateInventoryState',
        });
        const stopStateTimer = timer('Inventory state update');

        // If we switched account since starting this, give up before saving
        if (account !== currentAccountSelector(getState())) {
          return;
        }

        if (!getCurrentStore(stores)) {
          errorLog('d2-stores', 'No characters in profile');
          dispatch(
            error(
              new DimError(
                'Accounts.NoCharactersTitle',
                t('Accounts.NoCharacters'),
              ).withNoSocials(),
            ),
          );
          return;
        }

        // Cached loads can come from IDB, which can be VERY outdated, so don't
        // remove item tags/notes based on that. We also refuse to clean tags if
        // the profile is too old in wall-clock time. Technically we could do
        // this *only* based on the minted timestamp, but there's no real point
        // in cleaning items for cached loads since they presumably were cleaned
        // already.
        const profileMintedDate = new Date(profileResponse.responseMintedTimestamp ?? 0);
        if (live && Date.now() - profileMintedDate.getTime() < FRESH_ENOUGH_TO_CLEAN_INFOS) {
          dispatch(cleanInfos(stores));
        }
        dispatch(update({ stores, currencies }));
        dispatch(inGameLoadoutLoaded(loadouts));

        stopStateTimer();
        stateSpan?.finish();

        return stores;
      } catch (e) {
        errorLog('d2-stores', 'Error loading stores', e);
        reportException('d2stores', e);

        // If we switched account since starting this, give up
        if (account !== currentAccountSelector(getState())) {
          return;
        }

        dispatch(handleAuthErrors(e));

        if (storesSelector(getState()).length > 0) {
          // don't replace their inventory with the error, just notify
          showNotification(bungieErrorToaster(errorMessage(e)));
        } else {
          dispatch(error(convertToError(e)));
        }
        return undefined;
      } finally {
        transaction?.finish();
      }
    })();
    loadingTracker.addPromise(promise);
    return promise;
  };
}

function processCurrencies(profileInfo: DestinyProfileResponse, defs: D2ManifestDefinitions) {
  const profileCurrencies = profileInfo.profileCurrencies.data
    ? profileInfo.profileCurrencies.data.items
    : [];
  const currencies = profileCurrencies.map((c) => ({
    itemHash: c.itemHash,
    quantity: c.quantity,
    displayProperties: defs.InventoryItem.get(c.itemHash)?.displayProperties ?? {
      name: 'Unknown',
      description: 'Unknown item',
    },
  }));
  return currencies;
}
