import { faker } from '@faker-js/faker';

import { CreateUserAccount } from '@/domain/usecases/user/ICreateUserAccount';
import { IUser } from '@/domain/models/IUser';
import { Authentication } from '@/domain/usecases/user/IAuthentication';

export const mockCreateAccountParams = (): CreateUserAccount.Params => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  cityId: 1,
  createdAt: new Date(),
});

export const mockUser = (): IUser => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  avatar: faker.internet.url(),
  cityId: 1,
  createdAt: new Date(),
});

export const mockAuthenticationParams = (): Authentication.Params => ({
  email: 'any_email',
  password: 'any_password',
});
