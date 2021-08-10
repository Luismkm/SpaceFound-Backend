import { makeDbLoadProviders } from '@/main/factories/usecases/provider/loadProvider/dbLoadProviderFactory';
import { LoadProvidersController } from '@/presentation/controllers/provider/loadProvider/LoadProvidersController';
import { IController } from '@/presentation/protocols';

export const makeLoadProvidersController = (): IController => {
  const controller = new LoadProvidersController(makeDbLoadProviders());
  return controller;
};
