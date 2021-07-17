import { makeDbAuthentication } from '@/main/factories/usecases/account/authentication/DbAuthenticationFactory';
import { makeDbCreateAccount } from '@/main/factories/usecases/account/createAccount/dbCreateAccountFactory';
import { SignUpController } from '@/presentation/controllers/login/signUp/SignUpController';

import { IController } from '@/presentation/protocols';

import { makeSignUpValidation } from './signUpValidationFactory';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbCreateAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return controller;
};
