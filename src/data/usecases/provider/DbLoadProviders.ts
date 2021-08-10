import { ILoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';
import { IProvider } from '@/domain/models/IProvider';
import { ILoadProviders } from '@/domain/usecases/provider/ILoadProviders';

export class DbLoadProviders implements ILoadProviders {
  constructor(private readonly loadProvidersRepository: ILoadProvidersRepository) {}

  async load(): Promise<IProvider[]> {
    const providers = await this.loadProvidersRepository.loadAll();
    return providers;
  }
}
