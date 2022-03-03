import { ConfirmButton } from 'app/dim-ui/ConfirmButton';
import { t } from 'app/i18next-t';
import { storesSelector } from 'app/inventory/selectors';
import { DimStore } from 'app/inventory/store-types';
import { pullablePostmasterItems, pullFromPostmaster } from 'app/loadout/postmaster';
import { AppIcon, refreshIcon, sendIcon } from 'app/shell/icons';
import { useThunkDispatch } from 'app/store/thunk-dispatch';
import { RootState } from 'app/store/types';
import { queueAction } from 'app/utils/action-queue';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './PullFromPostmaster.m.scss';

export function PullFromPostmaster({ store }: { store: DimStore }) {
  const [working, setWorking] = useState(false);
  const dispatch = useThunkDispatch();
  const numPullablePostmasterItems = useSelector(
    (state: RootState) => pullablePostmasterItems(store, storesSelector(state)).length
  );
  if (numPullablePostmasterItems === 0) {
    return null;
  }

  const onClick = () => {
    queueAction(async () => {
      setWorking(true);
      try {
        await dispatch(pullFromPostmaster(store));
      } finally {
        setWorking(false);
      }
    });
  };

  return (
    <ConfirmButton className={styles.button} onClick={onClick}>
      <div className={styles.buttonContents}>
        <AppIcon spinning={working} icon={working ? refreshIcon : sendIcon} />
        <span className={styles.badge}>{numPullablePostmasterItems}</span>
        <span>{t('Loadouts.PullFromPostmaster')}</span>
      </div>
    </ConfirmButton>
  );
}
