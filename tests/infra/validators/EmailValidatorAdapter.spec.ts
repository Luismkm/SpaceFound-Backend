import validator from 'validator';

import { EmailValidatorAdapter } from '@/infra/validators/EmailValidatorAdapter';

jest.mock('validator', () => ({
  isEmail(email: string): boolean {
    return true;
  },
}));

let sut: EmailValidatorAdapter;

beforeEach(() => {
  sut = new EmailValidatorAdapter();
});

describe('EmailValidator Adapter', () => {
  it('should return false if validator return false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email');
    expect(isValid).toBeFalsy();
  });

  it('should return true if validator returns true', () => {
    const isValid = sut.isValid('valid_email');
    expect(isValid).toBeTruthy();
  });
});
