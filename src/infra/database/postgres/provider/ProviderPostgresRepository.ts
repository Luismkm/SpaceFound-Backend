import { knexHelper } from '@/infra/database/helpers';

import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IProvider } from '@/domain/models/IProvider';
import { ICreateProviderDTO } from '@/domain/usecases/provider/ICreateProvider';
import { ILoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';

export class ProviderPostgresRepository implements
 ICreateProviderRepository,
 ILoadProvidersRepository {
  async create(provider: IProvider): Promise<IProvider> {
    const {
      id, idBusiness, description, idUser,
    } = provider;
    const providerCreated = await knexHelper.knex('providers')
      .insert({
        id, id_business: idBusiness, description, id_user: idUser,
      }).returning('*');
    return providerCreated[0];
  }

  async loadAll(): Promise<IProvider[]> {
    const providers = await knexHelper.knex('providers').select('*');
    return providers;
  }
}
