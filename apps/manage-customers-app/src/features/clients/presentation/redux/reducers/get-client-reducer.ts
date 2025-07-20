import type { Client } from '../../../domain/models/client';
import {
  GET_CLIENT_ERROR,
  GET_CLIENT_REQUEST,
  GET_CLIENT_SUCCESS,
  type ClientsResponse,
} from '../types/get-client-types';

export interface GetClientRequestAction {
  type: typeof GET_CLIENT_REQUEST;
}

export interface GetClientSuccessAction {
  type: typeof GET_CLIENT_SUCCESS;
  payload: ClientsResponse;
}

export interface GetClientErrorAction {
  type: typeof GET_CLIENT_ERROR;
  payload: string;
}

export type GetClientActionTypes =
  | GetClientRequestAction
  | GetClientSuccessAction
  | GetClientErrorAction;

const initialState = {
  loading: false,
  clients: [] as Client[],
  totalPages: 0,
  currentPage: 1,
  error: null,
};

export const getClientReducer = (
  state = initialState,
  action: GetClientActionTypes
) => {
  switch (action.type) {
    case GET_CLIENT_REQUEST:
      return { ...state, loading: true };
    case GET_CLIENT_SUCCESS:
      return {
        ...state,
        loading: false,
        clients: action.payload.clients,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
        error: null,
      };
    case GET_CLIENT_ERROR:
      return {
        ...state,
        loading: false,
        clients: [],
        totalPages: 0,
        currentPage: 1,
        error: action.payload,
      };
    default:
      return state;
  }
};
