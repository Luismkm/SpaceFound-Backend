import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IProvider } from '@/domain/models/IProvider';
import { mockProvider, mockProviders } from '@/tests/domain/mocks/mockProvider';
import { ILoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';

export const mockCreateProvider = (): ICreateProviderRepository => {
  class CreateProviderRepositoryStub implements ICreateProviderRepository {
    async create(provider: IProvider): Promise<IProvider> {
      return Promise.resolve(mockProvider());
    }
  }
  return new CreateProviderRepositoryStub();
};

export const mockLoadProvidersRepository = (): ILoadProvidersRepository => {
  class LoadProvidersRepositoryStub implements ILoadProvidersRepository {
    async loadAll(): Promise<IProvider[]> {
      return Promise.resolve(mockProviders());
    }
  }
  return new LoadProvidersRepositoryStub();
};
