import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';
import { IAccount } from '@/domain/models/IAccount';
import { ICreateAccountDTO } from '@/domain/usecases/account/ICreateAccount';

export class DbCreateAccount implements ICreateAccountRepository {
  constructor(private readonly createAccountRepository: ICreateAccountRepository) {}

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const accountCreated = await this.createAccountRepository.create(account);
    return accountCreated;
  }
}
