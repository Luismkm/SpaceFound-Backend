import { ICreateProviderAccountRepository } from '@/data/protocols/db/provider/ICreateProviderAccountRepository';
import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { CreateProviderAccount, ICreateProviderAccount } from '@/domain/usecases/provider/ICreateProviderAccount';

export default class DbCreateProviderAccount implements ICreateProviderAccount {
  constructor(
    private readonly uuid: IUuidGenerator,
    private readonly createProviderRepository: ICreateProviderAccountRepository,
  ) {}

  async create(params: CreateProviderAccount.Params): Promise<CreateProviderAccount.Result> {
    const uuid = this.uuid.uuidGenerator();
    const providerCreated = await this.createProviderRepository.create({ ...params, id: uuid });
    return providerCreated;
  }
}
