import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import {
  IAccount, ICreateAccount, ICreateAccountDTO, IHasher,
} from './DbCreateAccountProtocols';

export class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) {}

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const checkUserExists = await this.loadAccountByEmailRepository.loadByEmail(account.email);
    if (!checkUserExists) {
      const passwordHashed = await this.hasher.hash(account.password);
      const accountCreated = await this.createAccountRepository.create({
        ...account, password: passwordHashed,
      });
      return accountCreated;
    }
    return null;
  }
}
