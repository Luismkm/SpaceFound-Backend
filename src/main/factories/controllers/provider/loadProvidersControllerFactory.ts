import { IController } from '@/presentation/protocols';
import { LoadProviderByIdController } from '@/presentation/controllers/provider/LoadProviderByIdController';
import { LoadProvidersController } from '@/presentation/controllers/provider/LoadProvidersController';
import { makeDbLoadProfileById, makeDbLoadAllProviders } from '@/main/factories/usecases/provider/loadProviderFactory';

export const makeLoadAllProvidersController = (): IController => {
  const controller = new LoadProvidersController(makeDbLoadAllProviders());
  return controller;
};

export const makeLoadProfileByIdController = (): IController => {
  const controller = new LoadProviderByIdController(makeDbLoadProfileById());
  return controller;
};
