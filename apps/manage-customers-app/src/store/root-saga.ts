import { all } from 'redux-saga/effects';
import { watchGetClient } from '../features';

// Root saga da aplicação
export function* rootSaga() {
  yield all([
    watchGetClient(),
    // Aqui podem ser adicionados outros sagas de features
    // Exemplo: authSagas(), userSagas(), etc.
  ]);
}

export default rootSaga;
