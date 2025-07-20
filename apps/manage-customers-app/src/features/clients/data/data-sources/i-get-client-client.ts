import type { HttpResponse } from '../../../../config/api-types';
import type { ClientsResponse } from '../../presentation/redux/types/get-client-types';

export interface IGetClientClient {
  get(): Promise<HttpResponse<ClientsResponse>>;
}
