import { mockProviderProfile, mockProviders } from '@/tests/domain/mocks/mockProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';
import { CreateProviderAccount, ICreateProviderAccount } from '@/domain/usecases/provider/ICreateProviderAccount';
import { ILoadProviders, LoadProviders } from '@/domain/usecases/provider/ILoadProviders';
import { ILoadProviderById, LoadProviderById } from '@/domain/usecases/provider/ILoadProviderById';
import { LoadProfileById } from '@/domain/usecases/provider/ILoadProfileById';

export class CreateProviderSpy implements ICreateProviderAccount {
  params: CreateProviderAccount.Params
  result = true

  async create(params: CreateProviderAccount.Params): Promise<CreateProviderAccount.Result> {
    this.params = params;
    return this.result;
  }
}

export const mockLoadProviders = ():ILoadProviders => {
  class LoadProvidersStub implements ILoadProviders {
    async load(): Promise<LoadProviders.Result[]> {
      return Promise.resolve(mockProviders());
    }
  }
  return new LoadProvidersStub();
};

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
