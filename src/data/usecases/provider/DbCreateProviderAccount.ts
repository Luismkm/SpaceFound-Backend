import { ICheckProviderByCnpjRepository, ICheckProviderByEmailRepository, ICreateProviderAccountRepository } from '@/data/protocols/db/provider';
import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { CreateProviderAccount, ICreateProviderAccount } from '@/domain/usecases/provider/ICreateProviderAccount';
import { EmailInUseError, CnpjAlreadyRegisteredError } from '@/presentation/errors';

export class DbCreateProviderAccount implements ICreateProviderAccount {
  constructor(
    private readonly uuid: IUuidGenerator,
    private readonly checkProviderByEmailRepository: ICheckProviderByEmailRepository,
    private readonly checkProviderByCnpjRepository: ICheckProviderByCnpjRepository,
    private readonly createProviderRepository: ICreateProviderAccountRepository,
  ) {}

  async create(params: CreateProviderAccount.Params): Promise<CreateProviderAccount.Result> {
    const isEmailInUse = await this.checkProviderByEmailRepository.checkProviderByEmail(params.email)
    if (isEmailInUse) return new EmailInUseError();
    const isCnpjAlreadyRegistered = await this.checkProviderByCnpjRepository.checkProviderByCnpj(params.cnpj)
    if (isCnpjAlreadyRegistered) return new CnpjAlreadyRegisteredError();
    const uuid = this.uuid.uuidGenerator();
    const providerCreated = await this.createProviderRepository.create({ ...params, id: uuid });
    return providerCreated;
  }
}
