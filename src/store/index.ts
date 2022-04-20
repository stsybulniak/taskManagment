import { combineReducers } from 'redux';
import { all, fork } from 'redux-saga/effects';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import ListsSaga from './list/sagas';
import { IListState, listsReducer } from './list';

export interface IApplicationState {
  router: RouterState;
  list: IListState;
}

export const createRootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    list: listsReducer,
  });

export function* rootSaga() {
  yield all([fork(ListsSaga)]);
}
