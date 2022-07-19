import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { CreateProvider, ICreateProvider } from '@/domain/usecases/provider/ICreateProvider';

export default class DbCreateProvider implements ICreateProvider {
  constructor(
    private readonly uuid: IUuidGenerator,
    private readonly createProviderRepository: ICreateProviderRepository,
  ) {}

  async create(params: CreateProvider.Params): Promise<CreateProvider.Result> {
    const uuid = this.uuid.uuidGenerator();
    const providerCreated = await this.createProviderRepository.create({ ...params, id: uuid });
    return providerCreated;
  }
}
