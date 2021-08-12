import { IProvider } from '@/domain/models/IProvider';
import { ILoadProviders } from '@/presentation/controllers/provider/loadProvider/LoadProvidersControllerProtocols';
import { ICreateProvider } from '@/presentation/controllers/provider/createProvider/ProviderControllerProtocols';

import { mockProvider, mockProviders } from '@/tests/domain/mocks/mockProvider';

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
    async load(): Promise<IProvider[]> {
      return Promise.resolve(mockProviders());
    }
  }
  return new LoadProvidersStub();
};
