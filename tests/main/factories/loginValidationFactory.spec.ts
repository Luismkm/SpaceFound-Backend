import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators';

import { IValidation } from '@/presentation/protocols';

import { makeLoginValidation } from '@/main/factories/controllers/user/loginValidationFactory';
import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';

jest.mock('@/validation/validators/ValidationComposite');

describe('Login Validation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: IValidation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
