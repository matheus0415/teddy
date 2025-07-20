import type { IGetClient } from '../../domain/use-cases/i-get-client';
import type { IGetClientClient } from '../data-sources/i-get-client-client';
import { HttpStatusCode } from '../../../../errors/http-status-code';
import { Exception } from '../../../../errors/exception';
import type { ClientsResponse } from '../../presentation/redux/types/get-client-types';

export class GetClientRepository implements IGetClient {
  private readonly dataSource: IGetClientClient;

  constructor(dataSource: IGetClientClient) {
    this.dataSource = dataSource;
  }

  async get(): Promise<ClientsResponse> {
    const result = await this.dataSource.get();

    if (result.status !== HttpStatusCode.OK) {
      throw new Exception(result.status, result.message!);
    }

    return result.data;
  }
}
