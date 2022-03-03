import { getNotes, getTag, TagValue } from 'app/inventory/dim-item-info';
import { DimItem } from 'app/inventory/item-types';
import { isNewSelector, itemHashTagsSelector, itemInfosSelector } from 'app/inventory/selectors';
import { searchFilterSelector } from 'app/search/search-filter';
import { RootState } from 'app/store/types';
import { wishListSelector } from 'app/wishlists/selectors';
import { InventoryWishListRoll } from 'app/wishlists/wishlists';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import InventoryItem from './InventoryItem';

// Props provided from parents
interface ProvidedProps {
  item: DimItem;
  id?: string; // defaults to item.index - id is typically used for `itemPop`
  allowFilter?: boolean;
  ignoreSelectedPerks?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
  onClick?(e: React.MouseEvent): void;
  onShiftClick?(e: React.MouseEvent): void;
  onDoubleClick?(e: React.MouseEvent): void;
  dimArchived?: boolean;
}

// Props from Redux via mapStateToProps
interface StoreProps {
  isNew: boolean;
  tag?: TagValue;
  notes?: boolean;
  wishlistRoll?: InventoryWishListRoll;
  searchHidden?: boolean;
}

function mapStateToProps(state: RootState, props: ProvidedProps): StoreProps {
  const { item, dimArchived } = props;
  const itemInfos = itemInfosSelector(state);
  const itemHashTags = itemHashTagsSelector(state);
  const tag = getTag(item, itemInfos, itemHashTags);
  const currentFilter = searchFilterSelector(state);
  const defaultFilterActive = currentFilter === _.stubTrue;

  return {
    isNew: isNewSelector(item)(state),
    tag,
    notes: getNotes(item, itemInfos, itemHashTags) ? true : false,
    wishlistRoll: wishListSelector(item)(state),
    searchHidden:
      // dim this item if there's no search filter and it's archived
      (dimArchived && defaultFilterActive && tag === 'archive') ||
      // or if there is filtering and it doesn't meet the condition
      (props.allowFilter && !currentFilter(item)),
  };
}

type Props = ProvidedProps & StoreProps;

/**
 * An item that can load its auxiliary state directly from Redux. Not suitable
 * for showing a ton of items, but useful!
 */
function ConnectedInventoryItem({
  item,
  id,
  isNew,
  tag,
  notes,
  wishlistRoll,
  onClick,
  onShiftClick,
  onDoubleClick,
  searchHidden,
  ignoreSelectedPerks,
  innerRef,
}: Props) {
  return (
    <InventoryItem
      item={item}
      id={id}
      isNew={isNew}
      tag={tag}
      notes={notes}
      wishlistRoll={wishlistRoll}
      onClick={onClick}
      onShiftClick={onShiftClick}
      onDoubleClick={onDoubleClick}
      searchHidden={searchHidden}
      ignoreSelectedPerks={ignoreSelectedPerks}
      innerRef={innerRef}
    />
  );
}

export default connect<StoreProps>(mapStateToProps)(ConnectedInventoryItem);
