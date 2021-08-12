import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/DbAuthenticationFactory';
import { LoginController } from '@/presentation/controllers/login/login/LoginController';
import { makeLoginValidation } from './loginValidationFactory';

import { IController } from '@/presentation/protocols';

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation());
  return controller;
};
