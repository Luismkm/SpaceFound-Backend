import { CreateUserAccount } from '@/domain/usecases/user/ICreateUserAccount';
import { IUser } from '@/domain/models/IUser';
import { Authentication } from '@/domain/usecases/user/IAuthentication';

export const mockCreateAccountParams = (): CreateUserAccount.Params => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  cityId: 1,
  createdAt: new Date(),
});

export const mockUser = (): IUser => ({
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
