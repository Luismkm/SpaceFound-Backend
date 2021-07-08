import { InvalidParamError } from '@/presentation/errors';
import { IEmailValidator } from '@/validation/protocols/IEmailValidator';
import { EmailValidation } from '@/validation/validators';
import { mockEmailValidator } from '@/tests/validation/mocks/mockEmailValidator';

type ISutTypes = {
  sut: EmailValidation
  emailValidatorStub: IEmailValidator
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = mockEmailValidator();

  const sut = new EmailValidation('email', emailValidatorStub);

  return {
    sut,
    emailValidatorStub,
  };
};

describe('Email Validation', () => {
  it('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false);
    const error = sut.validate({ email: 'any_email' });
    expect(error).toEqual(new InvalidParamError('email'));
  });
});
