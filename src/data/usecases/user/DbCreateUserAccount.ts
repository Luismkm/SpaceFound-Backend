import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { ICreateUserAccountRepository } from '@/data/protocols/db/user/ICreateUserAccountRepository';
import { IHasher } from '@/data/protocols';
import { ICheckAccountByEmailRepository } from '@/data/protocols/db/user/ICheckAccountByEmailRepository';
import { CreateUserAccount, ICreateUserAccount } from '@/domain/usecases/user/ICreateUserAccount';
import { ISendEmailService } from '@/data/protocols/emailService/ISendEmailService';

export class DbCreateUserAccount implements ICreateUserAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly uuid: IUuidGenerator,
    private readonly sendEmailService: ISendEmailService,
    private readonly createUserAccountRepository: ICreateUserAccountRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
  ) {}

  async create(params: CreateUserAccount.Params): Promise<CreateUserAccount.Result> {
    const checkUserExists = await this.checkAccountByEmailRepository.checkByEmail(params.email);
    if (checkUserExists) {
      return false;
    }
    const passwordHashed = await this.hasher.hash(params.password);
    const uuid = this.uuid.uuidGenerator();
    const isAccountCreated = await this.createUserAccountRepository.create({
      ...params, password: passwordHashed, id: uuid,
    });
    if (!isAccountCreated) {
      return false;
    }
    this.sendEmailService.send({
      to: {
        name: params.name,
        email: params.email,
      },
    });
    return true;
  }
}
