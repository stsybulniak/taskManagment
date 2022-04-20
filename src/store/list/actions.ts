import { DropResult } from 'react-beautiful-dnd';
import { action } from 'typesafe-actions';
import { ICard, IList, ListTypes } from './types';

export const fetchLists = () => action(ListTypes.fetchLists);
export const fetchListsError = (payload: string) => action(ListTypes.fetchListsFailure, payload);
export const fetchListsSuccess = (payload: IList[]) => action(ListTypes.fetchListsSuccess, payload);

export const dropCard = (payload: DropResult) => action(ListTypes.dropCard, payload);
export const dropCardSuccess = (payload: IList[]) => action(ListTypes.dropCardSuccess, payload);
export const dropCardFailur = (payload: IList[]) => action(ListTypes.dropCardFailur, payload);

export const removeColumn = (payload: string) => action(ListTypes.removeColumn, payload);
export const removeColumnSuccess = (payload: IList[]) => action(ListTypes.removeColumnSuccess, payload);

export const addNewColumn = (payload: Partial<IList>) => action(ListTypes.addNewColumn, payload);
export const addNewColumnSuccess = (payload: IList[]) => action(ListTypes.addNewColumnSuccess, payload);

export const updateColumn = (payload: { list: Partial<IList>; index: number }) =>
  action(ListTypes.updateColumn, payload);
export const updateColumnSuccess = (payload: IList[]) => action(ListTypes.updateColumnSuccess, payload);

export const addCard = (payload: { card: Partial<ICard>; columnIndex: number }) => action(ListTypes.addCard, payload);
export const addCardSuccess = (payload: IList[]) => action(ListTypes.addCardSuccess, payload);

export const setSelectedCard = (payload?: { columnIndex: number; cardIndex: number }) =>
  action(ListTypes.setSelectedCard, payload);

export const updateCard = (payload: { card: Partial<ICard>; columnIndex: number; cardIndex: number }) =>
  action(ListTypes.updateCard, payload);
export const updateCardSuccess = (payload: IList[]) => action(ListTypes.updateCardSuccess, payload);

export const deleteCard = (payload: { columnIndex: number; cardIndex: number }) =>
  action(ListTypes.deleteCard, payload);
export const deleteCardSuccess = (payload: IList[]) => action(ListTypes.deleteCardSuccess, payload);
