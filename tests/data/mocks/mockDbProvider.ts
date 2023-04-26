import { ICreateProviderAccountRepository, CreateProviderAccountRepository } from '@/data/protocols/db/provider/ICreateProviderAccountRepository';
import { ILoadAllProvidersRepository, LoadAllProvidersRepository } from '@/data/protocols/db/provider/ILoadAllProvidersRepository';

import { ILoadProfileByIdRepository, ILoadProviderByIdRepository, LoadProfileByIdRepository, LoadProviderByIdRepository } from '@/data/protocols';
import { ICheckProviderByIdRepository } from '@/data/protocols/db/provider/ICheckProviderByIdRepository';
import { mockLoadAllProviders } from '@/tests/domain/mocks/mockProvider';

export class CreateProviderRepositorySpy implements ICreateProviderAccountRepository {
  params: CreateProviderAccountRepository.Params
  result = true

  async create(params: CreateProviderAccountRepository.Params): Promise<CreateProviderAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAllProvidersRepositorySpy implements ILoadAllProvidersRepository {
  result = mockLoadAllProviders()

  async loadAll(): Promise<LoadAllProvidersRepository.Result[]> {
    return this.result
  }
}

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
