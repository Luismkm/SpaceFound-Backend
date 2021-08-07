import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IProvider } from '@/domain/models/IProvider';
import { mockProvider } from '@/tests/domain/mocks/mockProvider';

export const mockCreateProvider = (): ICreateProviderRepository => {
  class CreateProviderRepositoryStub implements ICreateProviderRepository {
    async create(provider: IProvider): Promise<IProvider> {
      return Promise.resolve(mockProvider());
    }
  }
  return new CreateProviderRepositoryStub();
};
