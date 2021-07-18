import { EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { makeLoginValidation } from '@/main/factories/controllers/login/login/loginValidationFactory';

import { IValidation } from '@/presentation/protocols';

import { mockEmailValidator } from '@/tests/validation/mocks/mockEmailValidator';

jest.mock('@/validation/validators/ValidationComposite');

describe('Login Validation Factory', () => {
  it('should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: IValidation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', mockEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
