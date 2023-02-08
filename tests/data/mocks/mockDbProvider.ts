import { ICreateProviderAccountRepository, CreateProviderAccountRepository } from '@/data/protocols/db/provider/ICreateProviderAccountRepository';
import { ILoadProvidersRepository, LoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';
import { ILoadProviderByIdRepository } from '@/data/protocols/db/provider/ILoadProviderByIdRepository';

import { mockProviderProfile, mockProviders } from '@/tests/domain/mocks/mockProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';

export class CreateProviderRepositorySpy implements ICreateProviderAccountRepository {
  params: CreateProviderAccountRepository.Params
  result = true

  async create(params: CreateProviderAccountRepository.Params): Promise<CreateProviderAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export const mockLoadProvidersRepository = (): ILoadProvidersRepository => {
  class LoadProvidersRepositoryStub implements ILoadProvidersRepository {
    async loadAll(): Promise<LoadProvidersRepository.Result[]> {
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
