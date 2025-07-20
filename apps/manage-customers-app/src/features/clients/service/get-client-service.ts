import type { IGetClientClient } from '../data/data-sources/i-get-client-client';
import { api } from '../../../config/api';
import type { HttpResponse } from '../../../config/api-types';
import type { Client } from '../domain/models/client';
import type {
  ClientsResponse,
  GetClientParams,
} from '../presentation/redux/types/get-client-types';

interface TeddyUser {
  id: number;
  name: string;
  salary: number;
  companyValuation: number;
  createdAt: string;
  updatedAt: string;
}

interface TeddyApiResponse {
  clients: TeddyUser[];
  totalPages: number;
  currentPage: number;
}

export class GetClientService implements IGetClientClient {
  async get(
    params: GetClientParams = {}
  ): Promise<HttpResponse<ClientsResponse>> {
    const { page = 0, limit = 10 } = params;

    try {
      const response = await api.get<TeddyApiResponse>(
        `/users?page=${page}&limit=${limit}`
      );

      const clients: Client[] = response.data.clients.map((user) => ({
        id: user.id.toString(),
        name: user.name,
        salary: `R$ ${user.salary.toLocaleString('pt-BR')}`,
        company: `R$ ${user.companyValuation.toLocaleString(
          'pt-BR'
        )}`,
      }));

      const clientsResponse: ClientsResponse = {
        clients,
        totalPages: response.data.totalPages,
        currentPage: response.data.currentPage,
      };

      return {
        status: response.status,
        data: clientsResponse,
        success: true,
      };
    } catch {
      return {
        status: 500,
        data: {
          clients: [],
          totalPages: 0,
          currentPage: 1,
        },
        success: false,
        message: 'Failed to fetch clients',
      };
    }
  }
}
