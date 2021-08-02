import { IAccount } from '@/domain/models/IAccount';
import { IAuthentication, IAuthenticationDTO } from '@/domain/usecases/account/IAuthentication';
import { ICreateAccount, ICreateAccountDTO } from '@/domain/usecases/account/ICreateAccount';

import { mockAccount } from '@/tests/domain/mocks';

export const mockCreateAccount = (): ICreateAccount => {
  class CreateAccountStub implements ICreateAccount {
    async create(account: ICreateAccountDTO): Promise<IAccount> {
      return Promise.resolve(mockAccount());
    }
  }
  return new CreateAccountStub();
};

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth(authentication: IAuthenticationDTO): Promise<string> {
      return Promise.resolve('any_token');
    }
  }
  return new AuthenticationStub();
};
