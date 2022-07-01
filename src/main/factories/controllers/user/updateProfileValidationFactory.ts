import {
  EmailValidation, RequiredFieldValidation, ValidationComposite,
} from '@/validation/validators';
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';

import { IValidation } from '@/presentation/protocols';

export const makeUpdateProfileValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['name', 'email']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

  return new ValidationComposite(validations);
};
