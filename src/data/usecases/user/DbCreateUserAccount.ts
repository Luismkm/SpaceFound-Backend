import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { ICreateAccountRepository } from '@/data/protocols/db/user/ICreateUserAccountRepository';
import { IHasher } from '@/data/protocols';
import { ICheckAccountByEmailRepository } from '@/data/protocols/db/user/ICheckUserByEmailRepository';
import { CreateUserAccount, ICreateUserAccount } from '@/domain/usecases/user/ICreateUserAccount';

export class DbCreateUserAccount implements ICreateUserAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly uuid: IUuidGenerator,
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
  ) {}

  async create(params: CreateUserAccount.Params): Promise<CreateUserAccount.Result> {
    let accountCreated = false;
    const checkUserExists = await this.checkAccountByEmailRepository.checkByEmail(params.email);
    if (!checkUserExists) {
      const passwordHashed = await this.hasher.hash(params.password);
      const uuid = this.uuid.uuidGenerator();
      accountCreated = await this.createAccountRepository.create({
        ...params, password: passwordHashed, id: uuid,
      });
    }
    return accountCreated;
  }
}
