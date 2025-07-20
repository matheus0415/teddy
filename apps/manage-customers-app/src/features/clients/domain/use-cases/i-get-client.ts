import type {
  ClientsResponse,
  GetClientParams,
} from '../../presentation/redux/types/get-client-types';

export interface IGetClient {
  get(_params?: GetClientParams): Promise<ClientsResponse>;
}
