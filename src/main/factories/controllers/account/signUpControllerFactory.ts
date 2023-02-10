import { SignUpController } from '@/presentation/controllers/account/SignUpController';
import { IController } from '@/presentation/protocols';
import { makeDbAuthentication } from '@/main/factories/usecases/account/authenticationFactory';
import { makeDbCreateAccount } from '@/main/factories/usecases/user/createUserAccountFactory';
import { makeSignUpValidation } from '@/main/factories/controllers/account/signUpValidationFactory';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbCreateAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return controller;
};
