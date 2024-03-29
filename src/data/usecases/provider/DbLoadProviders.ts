import { ILoadProvidersRepository, LoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';
import { ILoadProviders, LoadProviders } from '@/domain/usecases/provider/ILoadProviders';

export class DbLoadProviders implements ILoadProviders {
  constructor(private readonly loadProvidersRepository: ILoadProvidersRepository) {}

  async load(): Promise<LoadProviders.Result[]> {
    const providers = await this.loadProvidersRepository.loadAll();
    return providers;
  }
}
