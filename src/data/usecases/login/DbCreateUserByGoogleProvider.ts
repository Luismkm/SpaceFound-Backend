import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { ICheckAccountByEmailRepository } from '@/data/protocols/db/user/ICheckAccountByEmailRepository';
import { ISendEmailService } from '@/data/protocols/emailService/ISendEmailService';
import { CreateUserByGoogleProvider, ICreateUserByGoogleProvider } from '@/domain/usecases/login/ICreateUserByGoogleProvider';
import { ICreateUserByGoogleProviderRepository } from '@/data/protocols/db/login/ICreateUserByGoogleProviderRepository';

export class DbCreateUserByGoogleProvider implements ICreateUserByGoogleProvider {
  constructor(
    private readonly uuid: IUuidGenerator,
    private readonly sendEmailService: ISendEmailService,
    private readonly createUserByGoogleProviderRepository: ICreateUserByGoogleProviderRepository,
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
  ) {}

  async create(params: CreateUserByGoogleProvider.Params): Promise<CreateUserByGoogleProvider.Result> {
    const checkUserExists = await this.checkAccountByEmailRepository.checkByEmail(params.email);
    if (checkUserExists) return false;

    const uuid = this.uuid.uuidGenerator();
    const isAccountCreated = await this.createUserByGoogleProviderRepository.create({
      ...params, id: uuid,
    });
    if (!isAccountCreated) return false

    this.sendEmailService.send({
      to: {
        name: params.name,
        email: params.email,
      },
    });
    return true;
  }
}
