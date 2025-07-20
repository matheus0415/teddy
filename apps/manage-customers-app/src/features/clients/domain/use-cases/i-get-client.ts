import type { ClientsResponse } from '../../presentation/redux/types/get-client-types';

export interface IGetClient {
  get(): Promise<ClientsResponse>;
}
