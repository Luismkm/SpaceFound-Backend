import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';
import { IValidation } from '@/presentation/protocols';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['name', 'email', 'cityId', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
