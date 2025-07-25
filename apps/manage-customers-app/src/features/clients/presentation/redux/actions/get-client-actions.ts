import type {
  ClientsResponse,
  GetClientRequestPayload,
} from '../types/get-client-types';
import {
  GET_CLIENT_ERROR,
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
} from '../types/get-client-types';
import type {
  GetClientRequestAction,
  GetClientSuccessAction,
  GetClientErrorAction,
} from '../reducers/get-client-reducer';

export const getClientRequest = (
  payload?: GetClientRequestPayload
): GetClientRequestAction => ({
  type: GET_CLIENT_REQUEST,
  payload,
});

export const getClientSuccess = (
  response: ClientsResponse
): GetClientSuccessAction => ({
  type: GET_CLIENT_SUCCESS,
  payload: response,
});

export const getClientError = (
  error: string
): GetClientErrorAction => ({
  type: GET_CLIENT_ERROR,
  payload: error,
});
