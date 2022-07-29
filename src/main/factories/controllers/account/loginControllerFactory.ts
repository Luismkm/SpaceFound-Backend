import { IController } from '@/presentation/protocols';
import { LoginController } from '@/presentation/controllers/account/LoginController';
import { makeLoginValidation } from '@/main/factories/controllers/account/loginValidationFactory';
import { makeDbAuthentication } from '@/main/factories/usecases/account/authenticationFactory';

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation());
  return controller;
};
