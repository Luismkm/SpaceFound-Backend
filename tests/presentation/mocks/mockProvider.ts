import { CreateProviderAccount, ICreateProviderAccount } from '@/domain/usecases/provider/ICreateProviderAccount';
import { ILoadAllProviders, LoadAllProviders } from '@/domain/usecases/provider/ILoadAllProviders';
import { ILoadProviderById, LoadProviderById } from '@/domain/usecases/provider/ILoadProviderById';
import { mockLoadAllProviders } from '@/tests/domain/mocks/mockProvider';

export class CreateProviderSpy implements ICreateProviderAccount {
  params: CreateProviderAccount.Params
  result = true

  async create(params: CreateProviderAccount.Params): Promise<CreateProviderAccount.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAllProvidersSpy implements ILoadAllProviders {
  result = mockLoadAllProviders()

  async loadAll(): Promise<LoadAllProviders.Result[]> {
    return this.result
  }
}

export class LoadProviderByIdSpy implements ILoadProviderById {
  id: string
  result = {
    accountId: 'any_uuid',
    serviceId: 'any_uuid',
    description: 'any_description',
    avatar: 'any_avatar',
    averageStars: 3,
  }
  async load(id: string): Promise<LoadProviderById.Result> {
    this.id = id
    return this.result
  }
}
