import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';
import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
