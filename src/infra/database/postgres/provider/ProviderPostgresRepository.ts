import { knexHelper } from '@/infra/database/helpers';

import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IProvider } from '@/domain/models/IProvider';
import { ICreateProviderDTO } from '@/domain/usecases/provider/ICreateProvider';

export class ProviderPostgresRepository implements ICreateProviderRepository {
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
}
