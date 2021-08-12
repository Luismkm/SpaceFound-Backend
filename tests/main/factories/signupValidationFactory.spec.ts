import {
  CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite,
} from '@/validation/validators';
import { makeSignUpValidation } from '@/main/factories/controllers/login/signUp/signUpValidationFactory';

import { IValidation } from '@/presentation/protocols';

import { mockEmailValidator } from '@/tests/validation/mocks/mockEmailValidator';

jest.mock('@/validation/validators/ValidationComposite');

describe('SignUp Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: IValidation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', mockEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
