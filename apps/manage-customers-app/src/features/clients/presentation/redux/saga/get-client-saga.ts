import { call, put, takeEvery } from 'redux-saga/effects';
import type { SagaIterator } from 'redux-saga';
import {
  getClientSuccess,
  getClientError,
} from '../actions/get-client-actions';
import { GetClientService } from '../../../service/get-client-service';
import { GetClientRepository } from '../../../data/repositories/get-client-repository';
import { GetClientController } from '../../controllers/get-client-controller';
import { GET_CLIENT_REQUEST } from '../types/get-client-types';
import type { GetClientRequestAction } from '../reducers/get-client-reducer';

function* getClientSaga(
  action: GetClientRequestAction
): SagaIterator {
  try {
    const service = new GetClientService();
    const repository = new GetClientRepository(service);
    const controller = new GetClientController(repository);
    const { page, limit } = action.payload || {};
    const clients = yield call([controller, controller.get], {
      page,
      limit,
    });
    yield put(getClientSuccess(clients));
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : 'Failed to fetch clients';
    yield put(getClientError(message));
  }
}

export function* watchGetClient() {
  yield takeEvery(GET_CLIENT_REQUEST, getClientSaga);
}
