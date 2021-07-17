import { InvalidParamError } from '@/presentation/errors';
import { EmailValidation } from '@/validation/validators';

import { IEmailValidator } from '@/validation/protocols/IEmailValidator';

import { mockEmailValidator } from '@/tests/validation/mocks/mockEmailValidator';
import { throwError } from '@/tests/domain/mocks';

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

  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email');
  });

  it('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(throwError);
    expect(sut.validate).toThrow();
  });
});
