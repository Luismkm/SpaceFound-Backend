import { IAccount } from '@/domain/models/IAccount';
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
