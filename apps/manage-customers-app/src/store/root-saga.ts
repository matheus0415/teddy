import { all } from 'redux-saga/effects';
import { watchGetClient } from '../features';

export function* rootSaga() {
  yield all([watchGetClient()]);
}

export default rootSaga;
