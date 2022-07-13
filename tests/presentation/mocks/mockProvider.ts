import { IProvider } from '@/domain/models/IProvider';
import { ILoadProviderById, ILoadProviders, LoadProviders } from '@/presentation/controllers/provider/loadProvider/LoadProvidersControllerProtocols';
import { ICreateProvider } from '@/presentation/controllers/provider/createProvider/ProviderControllerProtocols';

import { mockProvider, mockProviderProfile, mockProviders } from '@/tests/domain/mocks/mockProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';

export const mockCreateProvider = ():ICreateProvider => {
  class CreateProvidersStub implements ICreateProvider {
    async create(): Promise<IProvider> {
      return Promise.resolve(mockProvider());
    }
  }
  return new CreateProvidersStub();
};

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
