import { ICreateAccountDTO } from '@/domain/usecases/account/ICreateAccount';

export const mockAccountDTO = (): ICreateAccountDTO => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
});
