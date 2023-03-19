import { ICreateProviderAccountRepository, CreateProviderAccountRepository } from '@/data/protocols/db/provider/ICreateProviderAccountRepository';
import { ILoadProvidersRepository, LoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';

import { mockProviders } from '@/tests/domain/mocks/mockProvider';
import { ILoadProfileByIdRepository, ILoadProviderByIdRepository, LoadProfileByIdRepository, LoadProviderByIdRepository } from '@/data/protocols';
import { ICheckProviderByIdRepository } from '@/data/protocols/db/provider/ICheckProviderByIdRepository';

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

export class CheckProviderByIdRepositorySpy implements ICheckProviderByIdRepository {
  id: string
  result = true

  async checkProfileById(id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class LoadProvidersByIdRepositorySpy implements ILoadProviderByIdRepository {
  async loadById(id: string): Promise<LoadProviderByIdRepository.Result> {
    throw new Error('Method not implemented.');
  }
}

export class LoadProfileByIdRepositorySpy implements ILoadProfileByIdRepository {
  id: string
  result = {
    accountId: 'any_uuid',
    serviceId: 'any_uuid',
    description: 'any_description',
    avatar: 'any_avatar',
    averageStars: 3,
  }
  async loadProfileById(id: string): Promise<LoadProfileByIdRepository.Result> {
    this.id = id
    return this.result
  }
}
