import { InvalidParamError } from '@/presentation/errors';
import { EmailValidation } from '@/validation/validators';

import { throwError } from '@/tests/domain/mocks';
import { EmailValidatorSpy } from '@/tests/validation/mocks/mockEmailValidator';

type ISutTypes = {
  sut: EmailValidation
  emailValidatorSpy: EmailValidatorSpy
}

const makeSut = (): ISutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy();
  const sut = new EmailValidation('email', emailValidatorSpy);
  return {
    sut,
    emailValidatorSpy,
  };
};

describe('Email Validation', () => {
  it('should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, 'isValid').mockReturnValueOnce(false);
    const error = sut.validate({ email: 'any_email' });
    expect(error).toEqual(new InvalidParamError('email'));
  });

  it('should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut();
    sut.validate({ email: 'any_email' });
    expect(emailValidatorSpy.email).toBe('any_email');
  });

  it('should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut();
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError);
    expect(sut.validate).toThrow();
  });
});
