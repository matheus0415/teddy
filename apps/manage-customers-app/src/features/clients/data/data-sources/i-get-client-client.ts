import type { HttpResponse } from '../../../../config/api-types';
import type {
  ClientsResponse,
  GetClientParams,
} from '../../presentation/redux/types/get-client-types';

export interface IGetClientClient {
  get(
    _params?: GetClientParams
  ): Promise<HttpResponse<ClientsResponse>>;
}
