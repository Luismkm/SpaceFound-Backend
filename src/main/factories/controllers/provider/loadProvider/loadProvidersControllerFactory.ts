import { makeDbLoadProviders, makeDbLoadProviderById } from '@/main/factories/usecases/provider/loadProvider/dbLoadProviderFactory';
import { LoadProviderByIdController } from '@/presentation/controllers/provider/loadProvider/LoadProviderByIdController';
import { LoadProvidersController } from '@/presentation/controllers/provider/loadProvider/LoadProvidersController';

import { IController } from '@/presentation/protocols';

export const makeLoadProvidersController = (): IController => {
  const controller = new LoadProvidersController(makeDbLoadProviders());
  return controller;
};

export const makeLoadProviderByIdController = (): IController => {
  const controller = new LoadProviderByIdController(makeDbLoadProviderById());
  return controller;
};
