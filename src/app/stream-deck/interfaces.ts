import { InventoryBucket } from 'app/inventory/inventory-buckets';
import { DimItem } from 'app/inventory/item-types';
import { DimStore } from 'app/inventory/store-types';
import { Loadout } from 'app/loadout-drawer/loadout-types';
import { ThunkResult } from 'app/store/types';
import * as actions from 'app/stream-deck/actions';
import { DeferredPromise } from 'app/stream-deck/util/deferred';
import { Reducer } from 'redux';
import { ActionType } from 'typesafe-actions';

export type StreamDeckSelectionType = 'loadout' | 'item';

// Redux Store Stream Deck State
export interface StreamDeckState {
  // WebSocket status
  readonly connected: boolean;
  // Deferred promise used with selections notifications and actions
  readonly selectionPromise: DeferredPromise;
  // Selection type
  readonly selection?: 'item' | 'loadout' | 'postmaster' | undefined;
}

export type StreamDeckAction = ActionType<typeof actions>;

// trigger a pre-written search
// choose a specific page (inventory, vendors, records, etc..)
// choose if highlight items only or move search items to current store
interface SearchAction {
  action: 'search';
  search: string;
  page: string;
  pullItems?: boolean;
}

// randomize the current character
// both modes (weapon only / all)
interface RandomizeAction {
  action: 'randomize';
  weaponsOnly: boolean;
}

// collect all items from postmaster
interface CollectPostmasterAction {
  action: 'collectPostmaster';
}

// trigger refresh DIM
interface RefreshAction {
  action: 'refresh';
}

// enable/disable farming mode
interface FarmingModeAction {
  action: 'farmingMode';
}

// maximize power
interface MaxPowerAction {
  action: 'maxPower';
}

// pick a random item of the selected bucket
// and move it to the vault to free a slot
interface FreeBucketSlotAction {
  action: 'freeBucketSlot';
  bucket: InventoryBucket['type'];
}

// pull a selected item from other character/vault
// (if the current character has already that item it will be moved to the vault)
interface PullItemAction {
  action: 'pullItem';
  item: string;
}

// allow the user to pick a specific "thing" and send it to the Stream Deck
// this thing can be a loadout or an item
interface SelectionAction {
  action: 'selection';
  selection: StreamDeckSelectionType;
}

// equip a selected loadout (for a specific store)
// send the shareable link of a loadout to the Stream Deck
interface EquipOrShareLoadoutAction {
  action: 'loadout' | 'shareLoadout';
  loadout: string;
  character: string;
}

export type StreamDeckMessage =
  | SearchAction
  | RandomizeAction
  | CollectPostmasterAction
  | RefreshAction
  | FarmingModeAction
  | MaxPowerAction
  | FreeBucketSlotAction
  | PullItemAction
  | SelectionAction
  | EquipOrShareLoadoutAction;

// Types of messages sent to Stream Deck

export interface VaultArgs {
  vault: number;
  shards?: number;
  glimmer?: number;
  brightDust?: number;
}

export interface MetricsArgs {
  gambit: number;
  vanguard: number;
  crucible: number;
  trials: number;
  gunsmith: number;
  ironBanner: number;
  battlePass: any;
  artifactIcon?: string;
}

export interface PostmasterArgs {
  total: number;
  ascendantShards: number;
  enhancementPrisms: number;
  spoils: number;
}

export interface MaxPowerArgs {
  artifact: number;
  base: string;
  total: string;
}

export interface SendToStreamDeckArgs {
  selectionType?: StreamDeckSelectionType;
  selection?: {
    label: string;
    subtitle: string;
    icon?: string;
    item?: string;
    loadout?: string;
    character?: string;
  };
  farmingMode?: boolean;
  shareUrl?: string;
  postmaster?: PostmasterArgs;
  maxPower?: MaxPowerArgs;
  vault?: VaultArgs;
  metrics?: MetricsArgs;
}

export interface LazyStreamDeck {
  reducer?: Reducer<StreamDeckState, StreamDeckAction>;
  core?: {
    startStreamDeckConnection: () => ThunkResult;
    stopStreamDeckConnection: () => ThunkResult;
    streamDeckSelectItem: (item: DimItem) => ThunkResult;
    streamDeckSelectLoadout: (loadout: Loadout, store: DimStore) => ThunkResult;
    resetIdentifierOnStreamDeck: () => void;
  };
}
