import { IProvider } from '@/domain/models/IProvider';
import { ILoadProviders } from '@/presentation/controllers/provider/loadProvider/LoadProvidersControllerProtocols';
import { mockProviders } from '@/tests/domain/mocks/mockProvider';

export const mockLoadProviders = ():ILoadProviders => {
  class LoadProvidersStub implements ILoadProviders {
    async load(): Promise<IProvider[]> {
      return Promise.resolve(mockProviders());
    }
  }
  return new LoadProvidersStub();
};
