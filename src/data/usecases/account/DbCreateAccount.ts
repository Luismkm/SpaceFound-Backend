import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';
import { IHasher } from '@/data/protocols';
import { ICheckAccountByEmailRepository } from '@/data/protocols/db/account/ICheckAccountByEmailRepository';
import { CreateAccount, ICreateAccount } from '@/domain/usecases/account/ICreateAccount';

export class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly uuid: IUuidGenerator,
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
  ) {}

  async create(account: CreateAccount.Params): Promise<CreateAccount.Result> {
    let accountCreated = false;
    const checkUserExists = await this.checkAccountByEmailRepository.checkByEmail(account.email);
    if (!checkUserExists) {
      const passwordHashed = await this.hasher.hash(account.password);
      const uuid = this.uuid.uuidGenerator();
      accountCreated = await this.createAccountRepository.create({
        ...account, password: passwordHashed, id: uuid,
      });
    }
    return accountCreated;
  }
}
