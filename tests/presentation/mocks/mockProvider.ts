import { IProvider } from '@/domain/models/IProvider';
import { ILoadProviderById, ILoadProviders, LoadProviders } from '@/presentation/controllers/provider/loadProvider/LoadProvidersControllerProtocols';
import { CreateProvider, ICreateProvider } from '@/presentation/controllers/provider/createProvider/ProviderControllerProtocols';

import { mockProviderProfile, mockProviders } from '@/tests/domain/mocks/mockProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';

export class CreateProviderSpy implements ICreateProvider {
  params: CreateProvider.Params
  result = true

  async create(params: CreateProvider.Params): Promise<CreateProvider.Result> {
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
