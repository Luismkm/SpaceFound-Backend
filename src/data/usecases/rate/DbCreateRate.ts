import { ICheckProviderByIdRepository } from '@/data/protocols/db/provider/ICheckProviderByIdRepository';
import { ICreateRateRepository } from '@/data/protocols/db/rate/ICreateRateRepository';
import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { ICreateRate, CreateRate } from '@/domain/usecases/rate/ICreateRate';

export default class DbCreateRate implements ICreateRate {
  constructor(
    private readonly uuid: IUuidGenerator,
    private readonly checkProvider: ICheckProviderByIdRepository,
    private readonly createRate: ICreateRateRepository,
  ) {}

  async create(params: CreateRate.Params): Promise<CreateRate.Result> {
    const uuid = this.uuid.uuidGenerator();
    const isValidProvider = this.checkProvider.checkProfileById(params.providerId)
    if (!isValidProvider) {
      return false
    }
    const rateCreated = this.createRate.create({ ...params, id: uuid });
    return rateCreated;
  }
}
