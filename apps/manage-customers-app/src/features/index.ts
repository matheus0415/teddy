// Export client feature Redux components
export { getClientReducer } from './clients/presentation/redux/reducers/get-client-reducer';
export { watchGetClient } from './clients/presentation/redux/saga/get-client-saga';
export { getClientRequest } from './clients/presentation/redux/actions/get-client-actions';

// Export types
export type { Client } from './clients/domain/models/client';
