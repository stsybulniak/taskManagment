export enum ListTypes {
  fetchLists = '@@list/FETCH_LISTS',
  fetchListsSuccess = '@@list/FETCH_LISTS_SUCCESS',
  fetchListsFailure = '@@list/FETCH_LISTS_FAILURE',

  dropCard = '@@list/DROP_CARD',
  dropCardSuccess = '@@list/DROP_CARD_SUCCESS',
  dropCardFailur = '@@list/DROP_CARD_FAILURE',

  removeColumn = '@@list/REMOVE_COLUMN',
  removeColumnSuccess = '@@list/REMOVE_COLUMN_SUCCESS',

  addNewColumn = '@@list/ADD_NEW_COLUMN',
  addNewColumnSuccess = '@@list/ADD_NEW_COLUMN_SUCCESS',

  updateColumn = '@@list/UPDATE_COLUMN',
  updateColumnSuccess = '@@list/UPDATE_COLUMN_SUCCESS',

  addCard = '@@list/ADD_CARD',
  addCardSuccess = '@@list/ADD_CARD_SUCCESS',

  setSelectedCard = '@@list/SET_SELECTED_CARD',

  updateCard = '@@list/UPDATE_CARD',
  updateCardSuccess = '@@list/UPDATE_CARD_SUCCESS',

  deleteCard = '@@list/DELETE_CARD',
  deleteCardSuccess = '@@list/DELETE_CARD_SUCCESS',
}

export interface ICard {
  id: string;
  title: string;
  description: string;
}

export interface IList {
  id: string;
  title: string;
  cards: ICard[];
}

export interface IListState {
  lists: IList[];
  isLoading: boolean;
  error: string | null;
  selectedCardColumnInd?: number; 
  selectedCardInd?: number; 
}
