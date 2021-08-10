import { makeDbCreateProvider } from '@/main/factories/usecases/provider/createProvider/dbCreateProviderFactory';
import { CreateProviderController } from '@/presentation/controllers/provider/createProvider/CreateProviderController';
import { IController } from '@/presentation/protocols/IController';
import { makeCreateProviderValidation } from './createProviderValidationFactory';

export const makeCreateProviderController = ():IController => {
  const controller = new CreateProviderController(
    makeDbCreateProvider(),
    makeCreateProviderValidation(),
  );
  return controller;
};
