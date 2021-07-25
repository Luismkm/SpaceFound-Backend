import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import {
  IAccount, ICreateAccount, ICreateAccountDTO, IHasher,
} from './DbCreateAccountProtocols';

export class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly uuid: IUuidGenerator,
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) {}

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const checkUserExists = await this.loadAccountByEmailRepository.loadByEmail(account.email);
    if (!checkUserExists) {
      const passwordHashed = await this.hasher.hash(account.password);
      const uuid = this.uuid.uuidGenerator();
      const accountCreated = await this.createAccountRepository.create({
        ...account, password: passwordHashed, id: uuid,
      });
      return accountCreated;
    }
    return null;
  }
}
