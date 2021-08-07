import { CreateProviderController } from '@/presentation/controllers/provider/CreateProviderController';
import { IController } from '@/presentation/protocols/IController';
import { makeDbCreateProvider } from '../../usecases/provider/dbCreateProviderFactory';
import { makeCreateProviderValidation } from './createProviderValidationFactory';

export const makeCreateProviderController = ():IController => {
  const controller = new CreateProviderController(
    makeDbCreateProvider(),
    makeCreateProviderValidation(),
  );
  return controller;
};
