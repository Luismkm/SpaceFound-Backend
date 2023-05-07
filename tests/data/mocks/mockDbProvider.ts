import { ICreateProviderAccountRepository, CreateProviderAccountRepository } from '@/data/protocols/db/provider/ICreateProviderAccountRepository';
import { ILoadAllProvidersRepository, LoadAllProvidersRepository } from '@/data/protocols/db/provider/ILoadAllProvidersRepository';

import { ICheckProviderByIdRepository } from '@/data/protocols/db/provider/ICheckProviderByIdRepository';
import { mockLoadAllProviders } from '@/tests/domain/mocks/mockProvider';
import { ICheckProviderByEmailRepository } from '@/data/protocols/db/provider/ICheckProviderByEmailRepository';
import { IUpdateAvatarRepository, UpdateAccountAvatarRepository } from '@/data/protocols/db/provider/IUpdateAccountAvatarRepository';
import { ICheckProviderByCnpjRepository, ILoadProfileByIdRepository, LoadProfileByIdRepository, ILoadProviderByEmailRepository, LoadProviderByEmailRepository } from '@/data/protocols/db/provider';

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

  async checkProviderById(id: string): Promise<boolean> {
    this.id = id
    return this.result
  }
}

export class CheckProviderByEmailRepositorySpy implements ICheckProviderByEmailRepository {
  email: string
  result = false

  async checkProviderByEmail(email: string): Promise<boolean> {
    this.email = email
    return this.result
  }
}

export class CheckProviderByCnpjRepositorySpy implements ICheckProviderByCnpjRepository {
  cnpj: string
  result = false

  async checkProviderByCnpj(cnpj: string): Promise<boolean> {
    this.cnpj = cnpj
    return this.result
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

export class UpdateAvatarRepositorySpy implements IUpdateAvatarRepository {
  params: UpdateAccountAvatarRepository.Params
  result = true

  async updateAvatar(params: UpdateAccountAvatarRepository.Params): Promise<UpdateAccountAvatarRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAccountByEmailRepositorySpy implements ILoadProviderByEmailRepository {
  email: string
  result = {
    id: 'any_uuid',
    password: 'any_password',
  }

  async loadByEmail(email: string): Promise<LoadProviderByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}
