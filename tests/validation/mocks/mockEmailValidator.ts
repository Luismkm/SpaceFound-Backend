import { IEmailValidator } from '@/validation/protocols/IEmailValidator';

export class EmailValidatorSpy implements IEmailValidator {
  email: string
  result: boolean = true

  isValid(email: string): boolean {
    this.email = email
    return this.result;
  }
}
