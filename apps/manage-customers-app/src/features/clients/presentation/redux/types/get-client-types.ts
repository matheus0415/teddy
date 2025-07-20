import type { Client } from '../../../domain/models/client';

export const GET_CLIENT_REQUEST = 'GET_CLIENT_REQUEST';
export const GET_CLIENT_SUCCESS = 'GET_CLIENT_SUCCESS';
export const GET_CLIENT_ERROR = 'GET_CLIENT_ERROR';

export interface ClientsResponse {
  clients: Client[];
  totalPages: number;
  currentPage: number;
}

export interface GetClientState {
  loading: boolean;
  clients: Client[];
  totalPages: number;
  currentPage: number;
  error: string | null;
}
