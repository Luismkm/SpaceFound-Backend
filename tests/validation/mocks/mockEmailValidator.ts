import { IEmailValidator } from '@/validation/protocols/IEmailValidator';

export const mockEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(input: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};
