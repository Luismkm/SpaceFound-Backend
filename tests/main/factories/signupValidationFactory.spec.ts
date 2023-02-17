import { CompareFieldsValidation, EmailValidation, RequiredFieldValidation, ValidationComposite } from '@/validation/validators';
import { IValidation } from '@/presentation/protocols';
import { makeSignUpValidation } from '@/main/factories/controllers/user/signUpValidationFactory';

import { mockEmailValidator } from '@/tests/validation/mocks/mockEmailValidator';

jest.mock('@/validation/validators/ValidationComposite');

describe('SignUp Validation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: IValidation[] = [];
    for (const field of ['name', 'email', 'cityId', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', mockEmailValidator()));

    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
