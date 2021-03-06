import { CreateAccount } from '@/domain/usecases/account/ICreateAccount';
import { IAccount } from '@/domain/models/IAccount';
import { Authentication } from '@/domain/usecases/account/IAuthentication';

export const mockCreateAccountParams = (): CreateAccount.Params => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  cityId: 1,
  createdAt: new Date(),
});

export const mockAccount = (): IAccount => ({
  id: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  avatar: 'any_avatar',
  cityId: 1,
  createdAt: new Date(),
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email',
  password: 'any_password',
});
