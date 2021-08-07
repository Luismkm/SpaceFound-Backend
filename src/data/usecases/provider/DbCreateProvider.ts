import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { IProvider } from '@/domain/models/IProvider';
import { ICreateProvider, ICreateProviderDTO } from '@/domain/usecases/provider/ICreateProvider';

export default class DbCreateProvider implements ICreateProvider {
  constructor(
    private readonly uuid: IUuidGenerator,
    private readonly createProviderRepository: ICreateProviderRepository,
  ) {}

  async create(provider: ICreateProviderDTO): Promise<IProvider> {
    const uuid = this.uuid.uuidGenerator();
    const providerCreated = await this.createProviderRepository.create({ ...provider, id: uuid });
    return providerCreated;
  }
}
