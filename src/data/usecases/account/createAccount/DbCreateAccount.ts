import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';
import {
  IAccount, ICreateAccount, ICreateAccountDTO, IHasher,
} from './DbCreateAccountProtocols';

export class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly createAccountRepository: ICreateAccountRepository,
  ) {}

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const passwordHashed = await this.hasher.hash(account.password);
    const accountCreated = await this.createAccountRepository.create({
      ...account, password: passwordHashed,
    });
    return accountCreated;
  }
}
