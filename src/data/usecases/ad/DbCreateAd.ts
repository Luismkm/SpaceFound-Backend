import { ICreateAdRepository } from '@/data/protocols/db/ad/ICreateAdRepository';
import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';
import { CreateAd, ICreateAd } from '@/domain/usecases/ad/ICreateAd';

export class DbCreateAd implements ICreateAd {
  constructor(
    private readonly uuid: IUuidGenerator,
    private readonly createAdRepository: ICreateAdRepository,
  ) {}

  async create(params: CreateAd.Params): Promise<CreateAd.Result> {
    const uuid = this.uuid.uuidGenerator();
    const adCreated = await this.createAdRepository.create({ ...params, id: uuid });
    return adCreated !== null;
  }
}
