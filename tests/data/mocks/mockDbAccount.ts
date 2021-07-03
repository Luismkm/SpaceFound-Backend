import { ICreateAccountRepository } from '@/data/protocols';
import { IAccount } from '@/domain/models/IAccount';
import { ICreateAccountDTO } from '@/domain/usecases/account/ICreateAccount';

export const mockCreateAccountRepository = (): ICreateAccountRepository => {
  class CreateAccountRepositoryStub implements ICreateAccountRepository {
    async create(account: ICreateAccountDTO): Promise<IAccount> {
      return Promise.resolve(null);
    }
  }
  return new CreateAccountRepositoryStub();
};
