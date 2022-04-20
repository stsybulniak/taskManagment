import { all, fork, put, takeEvery, select } from 'redux-saga/effects';
import {
  fetchListsError,
  fetchListsSuccess,
  dropCardSuccess,
  dropCardFailur,
  removeColumnSuccess,
  addNewColumnSuccess,
  updateColumnSuccess,
  addCardSuccess,
  updateCardSuccess,
  deleteCardSuccess,
} from './actions';
import { ICard, IList, ListTypes } from './types';
import { getListData, sleep } from '../../utils';
import * as listActions from '../../store/list/actions';
import { IApplicationState } from '..';
import { v4 as uuidv4 } from 'uuid';

const removeFromList = (cards: ICard[], index: number): [ICard, ICard[]] => {
  const result = [...cards];
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list: IList, index: number, element: ICard) => {
  const result = { ...list };
  const cards = [...list.cards];
  cards.splice(index, 0, element);
  result.cards = cards;
  return result;
};

function* fetchLists() {
  yield sleep(1); // imitate API request
  return { data: ['column 1', 'column 2'].map((title) => getListData(title, 15)) };
}

function* handleFetchLists() {
  try {
    const resp: { data: IList[] } = yield fetchLists();
    yield put(fetchListsSuccess(resp.data));
  } catch (err: any) {
    yield put(fetchListsError(err.message || 'Error occurred'));
  }
}

function* handleDropCard({ payload }: ReturnType<typeof listActions.dropCard>) {
  yield;
  const {
    list: { lists },
  }: IApplicationState = yield select();

  try {
    const listsCopy = [...lists];

    const sourceColumnInd = Number(payload.source.droppableId);
    const sourceList = listsCopy[sourceColumnInd];

    const [removedElement, newSourceList] = removeFromList(sourceList.cards, payload.source.index);
    listsCopy[sourceColumnInd] = { ...sourceList, cards: newSourceList };

    const destinationListInd = Number(payload!.destination!.droppableId);
    const destinationList = listsCopy[destinationListInd];

    listsCopy[destinationListInd] = addToList(destinationList, payload!.destination!.index, removedElement);

    yield put(dropCardSuccess(listsCopy));
  } catch (err: any) {
    yield put(dropCardFailur(err.message || 'Error occurred'));
  }
}

function* handleRemoveColumn({ payload }: ReturnType<typeof listActions.removeColumn>) {
  const {
    list: { lists },
  }: IApplicationState = yield select();

  const newLists = lists.filter((list) => list.id !== payload);

  yield put(removeColumnSuccess(newLists));
}

function* handleAddNewColumn({ payload }: ReturnType<typeof listActions.addNewColumn>) {
  yield sleep(1); // imitate API request
  const {
    list: { lists },
  }: IApplicationState = yield select();
  const newObj = { ...payload, id: uuidv4() } as IList;
  const newLists = [...lists, newObj];

  yield put(addNewColumnSuccess(newLists));
}

function* handleUpdateColumn({ payload }: ReturnType<typeof listActions.updateColumn>) {
  yield sleep(1); // imitate API request
  const { list, index } = payload;
  const {
    list: { lists },
  }: IApplicationState = yield select();

  const copyLists = [...lists];
  copyLists[index] = { ...copyLists[index], ...list };

  yield put(updateColumnSuccess(copyLists));
}

function* handleAddCard({ payload }: ReturnType<typeof listActions.addCard>) {
  const { card, columnIndex } = payload;
  yield sleep(1); // imitate API request
  const newCard = { ...card, id: uuidv4() } as ICard;

  const {
    list: { lists },
  }: IApplicationState = yield select();

  const copyLists = [...lists];
  const updatedList = { ...copyLists[columnIndex] };
  updatedList.cards = [...updatedList.cards, newCard];
  copyLists[columnIndex] = updatedList;

  yield put(addCardSuccess(copyLists));
}

function* handleUpdateCard({ payload }: ReturnType<typeof listActions.updateCard>) {
  const { card, columnIndex, cardIndex } = payload;
  const {
    list: { lists },
  }: IApplicationState = yield select();

  const copyLists = [...lists];
  const updatedList = { ...copyLists[columnIndex] };
  const updatedCard = { ...updatedList.cards[cardIndex], ...card };
  const copyCards = [...updatedList.cards];
  copyCards[cardIndex] = updatedCard;
  updatedList.cards = copyCards;
  copyLists[columnIndex] = updatedList;

  yield put(updateCardSuccess(copyLists));
}

function* handleDeleteCard({ payload }: ReturnType<typeof listActions.deleteCard>) {
  const { columnIndex, cardIndex } = payload;
  const {
    list: { lists },
  }: IApplicationState = yield select();

  const copyLists = [...lists];
  const updatedList = { ...copyLists[columnIndex] };
  const copyCards = [...updatedList.cards];
  copyCards.splice(cardIndex, 1);
  updatedList.cards = copyCards;
  copyLists[columnIndex] = updatedList;

  yield put(deleteCardSuccess(copyLists));
}

function* watchListSaga() {
  yield takeEvery(ListTypes.fetchLists, handleFetchLists);
  yield takeEvery(ListTypes.dropCard, handleDropCard);
  yield takeEvery(ListTypes.removeColumn, handleRemoveColumn);
  yield takeEvery(ListTypes.addNewColumn, handleAddNewColumn);
  yield takeEvery(ListTypes.updateColumn, handleUpdateColumn);
  yield takeEvery(ListTypes.addCard, handleAddCard);
  yield takeEvery(ListTypes.updateCard, handleUpdateCard);
  yield takeEvery(ListTypes.deleteCard, handleDeleteCard);
}

function* listSaga() {
  yield all([fork(watchListSaga)]);
}

export default listSaga;
