import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IProvider } from '@/domain/models/IProvider';
import { ILoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';
import { ILoadProviderByIdRepository } from '@/data/protocols/db/provider/ILoadProviderByIdRepository';

import { mockProvider, mockProviderProfile, mockProviders } from '@/tests/domain/mocks/mockProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';

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

export const mockLoadProviderByIdRepository = (): ILoadProviderByIdRepository => {
  class LoadProviderByIdRepositoryStub implements ILoadProviderByIdRepository {
    async loadById(): Promise<IProviderProfile> {
      return Promise.resolve(mockProviderProfile());
    }
  }
  return new LoadProviderByIdRepositoryStub();
};
