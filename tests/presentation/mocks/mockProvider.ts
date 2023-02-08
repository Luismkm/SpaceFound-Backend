import { mockProviderProfile, mockProviders } from '@/tests/domain/mocks/mockProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';
import { CreateAccountProvider, ICreateAccountProvider } from '@/domain/usecases/provider/ICreateAccountProvider';
import { ILoadProviders, LoadProviders } from '@/domain/usecases/provider/ILoadProviders';
import { ILoadProviderById } from '@/domain/usecases/provider/ILoadProviderById';

export class CreateProviderSpy implements ICreateAccountProvider {
  params: CreateAccountProvider.Params
  result = true

  async create(params: CreateAccountProvider.Params): Promise<CreateAccountProvider.Result> {
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

export const mockLoadProviderById = ():ILoadProviderById => {
  class LoadProviderByIdStub implements ILoadProviderById {
    async loadById(): Promise<IProviderProfile> {
      return Promise.resolve(mockProviderProfile());
    }
  }
  return new LoadProviderByIdStub();
};
