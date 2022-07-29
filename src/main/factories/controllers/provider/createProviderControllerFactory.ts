import { IController } from '@/presentation/protocols/IController';
import { CreateProviderController } from '@/presentation/controllers/provider/CreateProviderController';
import { makeCreateProviderValidation } from '@/main/factories/controllers/provider/createProviderValidationFactory';
import { makeDbCreateProvider } from '@/main/factories/usecases/provider/createProviderFactory';

export const makeCreateProviderController = ():IController => {
  const controller = new CreateProviderController(
    makeDbCreateProvider(),
    makeCreateProviderValidation(),
  );
  return controller;
};
