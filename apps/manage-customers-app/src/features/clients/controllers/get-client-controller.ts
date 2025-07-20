import type { IGetClient } from '../domain/use-cases/i-get-client';
import type { ClientsResponse } from '../presentation/redux/types/get-client-types';

export class GetClientController {
  private readonly repository: IGetClient;

  constructor(repository: IGetClient) {
    this.repository = repository;
  }

  async get(): Promise<ClientsResponse> {
    return await this.repository.get();
  }
}
