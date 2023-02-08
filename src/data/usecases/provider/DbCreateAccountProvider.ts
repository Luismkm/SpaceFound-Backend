import { ICreateProviderAccountRepository } from '@/data/protocols/db/provider/ICreateProviderAccountRepository';
import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { CreateAccountProvider, ICreateAccountProvider } from '@/domain/usecases/provider/ICreateAccountProvider';

export default class DbCreateProviderAccount implements ICreateAccountProvider {
  constructor(
    private readonly uuid: IUuidGenerator,
    private readonly createProviderRepository: ICreateProviderAccountRepository,
  ) {}

  async create(params: CreateAccountProvider.Params): Promise<CreateAccountProvider.Result> {
    const uuid = this.uuid.uuidGenerator();
    const providerCreated = await this.createProviderRepository.create({ ...params, id: uuid });
    return providerCreated;
  }
}
