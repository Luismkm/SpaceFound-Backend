import { ILoadAllProvidersRepository } from '@/data/protocols/db/provider/ILoadAllProvidersRepository';
import { ILoadAllProviders, LoadAllProviders } from '@/domain/usecases/provider/ILoadAllProviders';

export class DbLoadAllProviders implements ILoadAllProviders {
  constructor(private readonly loadProvidersRepository: ILoadAllProvidersRepository) {}

  async loadAll(): Promise<LoadAllProviders.Result[]> {
    const providers = await this.loadProvidersRepository.loadAll();
    return providers;
  }
}
