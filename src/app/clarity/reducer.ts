import { Reducer } from 'redux';
import { ActionType, getType } from 'typesafe-actions';
import * as actions from './actions';
import { ClarityDescription } from './descriptions/descriptionInterface';

export type ClarityAction = ActionType<typeof actions>;

export interface ClarityState {
  /**
   * Descriptions from community provided by Clarity API
   */
  descriptions?: ClarityDescription;
  loadClarity?: boolean;
}

const initialState: ClarityState = {};
export const clarity: Reducer<ClarityState, ClarityAction> = (
  state: ClarityState = initialState,
  action: ClarityAction
) => {
  switch (action.type) {
    case getType(actions.loadDescriptions):
      return {
        ...state,
        descriptions: action.payload,
      };
    case getType(actions.loadClarity):
      return {
        ...state,
        loadClarity: action.payload,
      };
    default:
      return state;
  }
};
