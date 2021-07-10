import {
  CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite,
} from '@/validation/validators';

import { IValidation } from '@/presentation/protocols';
import { EmailValidationAdapter } from '@/infra/validators/EmailValidatorAdapter';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidationAdapter()));

  return new ValidationComposite(validations);
};
