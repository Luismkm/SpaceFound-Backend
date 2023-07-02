import { IController } from '@/presentation/protocols';
import { LoginController } from '@/presentation/controllers/user/LoginController';
import { makeLoginValidation } from '@/main/factories/controllers/user/loginValidationFactory';
import { makeDbAuthentication } from '@/main/factories/usecases/user/authenticationFactory';

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation());
  return controller;
};
