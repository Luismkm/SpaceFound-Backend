import { ILoadProviderByIdRepository } from '@/data/protocols/db/provider/ILoadProviderByIdRepository';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';
import { ILoadProviderById } from '@/domain/usecases/provider/ILoadProviderById';

export class DbLoadProviderById implements ILoadProviderById {
  constructor(private readonly loadProviderByIdRepository: ILoadProviderByIdRepository) {}

  async loadById(id: string): Promise<IProviderProfile> {
    const provider = await this.loadProviderByIdRepository.loadById(id);
    return provider;
  }
}
