import { Reducer } from 'redux';
import { IListState, ListTypes } from './types';

export const initialState: IListState = {
  isLoading: false,
  lists: [],
  error: null,
  selectedCardColumnInd: undefined,
  selectedCardInd: undefined,
};

export const listsReducer: Reducer<IListState> = (state = initialState, { type, payload = {} }) => {
  if (
    [
      ListTypes.fetchListsSuccess,
      ListTypes.removeColumnSuccess,
      ListTypes.dropCardSuccess,
      ListTypes.addNewColumnSuccess,
      ListTypes.updateColumnSuccess,
      ListTypes.addCardSuccess,
      ListTypes.updateCardSuccess,
      ListTypes.deleteCardSuccess,
    ].includes(type)
  ) {
    return { ...state, isLoading: false, lists: payload, error: null };
  }

  if (
    [
      ListTypes.fetchLists,
      ListTypes.removeColumn,
      ListTypes.addNewColumn,
      ListTypes.updateColumn,
      ListTypes.addCard,
    ].includes(type)
  ) {
    return { ...state, isLoading: true };
  }

  if ([ListTypes.dropCardFailur, ListTypes.fetchListsFailure].includes(type)) {
    return { ...state, isLoading: false, error: payload };
  }

  if (type === ListTypes.setSelectedCard) {
    const { columnIndex, cardIndex } = payload;
    return { ...state, selectedCardColumnInd: columnIndex, selectedCardInd: cardIndex };
  }

  return state;
};
