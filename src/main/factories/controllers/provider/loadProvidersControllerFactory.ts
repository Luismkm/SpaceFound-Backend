import { IController } from '@/presentation/protocols';
import { LoadProviderByIdController } from '@/presentation/controllers/provider/LoadProviderByIdController';
import { LoadProvidersController } from '@/presentation/controllers/provider/LoadProvidersController';
import { makeDbLoadProviderById, makeDbLoadProviders } from '@/main/factories/usecases/provider/loadProviderFactory';

export const makeLoadProvidersController = (): IController => {
  const controller = new LoadProvidersController(makeDbLoadProviders());
  return controller;
};

export const makeLoadProviderByIdController = (): IController => {
  const controller = new LoadProviderByIdController(makeDbLoadProviderById());
  return controller;
};
