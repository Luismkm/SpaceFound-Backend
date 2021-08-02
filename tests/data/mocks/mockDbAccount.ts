import { ICreateAccountRepository } from '@/data/protocols';
import { IAccount } from '@/domain/models/IAccount';
import { ICreateAccountDTO } from '@/domain/usecases/account/ICreateAccount';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import { IUpdateAvatar } from '@/domain/usecases/user/IUpdateAvatar';

import { mockAccount } from '@/tests/domain/mocks';

export const mockCreateAccountRepository = (): ICreateAccountRepository => {
  class CreateAccountRepositoryStub implements ICreateAccountRepository {
    async create(account: ICreateAccountDTO): Promise<IAccount> {
      return Promise.resolve(mockAccount());
    }
  }
  return new CreateAccountRepositoryStub();
};

export const mockDbUpdateAvatar = (): IUpdateAvatar => {
  class DbUpdateAvatarStub implements IUpdateAvatar {
    update(userId: string, fileName: string): Promise<IAccount> {
      return Promise.resolve(mockAccount());
    }
  }
  return new DbUpdateAvatarStub();
};

export const mockLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepository implements ILoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<IAccount> {
      return Promise.resolve(mockAccount());
    }
  }
  return new LoadAccountByEmailRepository();
};
