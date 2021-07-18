import { ICreateAccountDTO } from '@/domain/usecases/account/ICreateAccount';
import { IAccount } from '@/domain/models/IAccount';
import { IAuthenticationDTO } from '@/data/usecases/account/authentication/DbAuthenticationProtocols';

export const mockAccountDTO = (): ICreateAccountDTO => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
});

export const mockAccount = (): IAccount => ({ ...mockAccountDTO(), id: 'any_id', password: 'hashed_password' });

export const mockAuthenticationDTO = (): IAuthenticationDTO => ({
  email: 'any_email',
  password: 'any_password',
});
