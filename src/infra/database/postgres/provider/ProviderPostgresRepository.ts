import { knexHelper } from '@/infra/database/helpers';

import {
  ICreateProviderRepository, ILoadProviderByIdRepository, ILoadProvidersRepository, IProvider, LoadProvidersRepository,
} from './ProviderPostgresRepositoryProtocols';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';

export class ProviderPostgresRepository implements
  ICreateProviderRepository,
  ILoadProvidersRepository,
  ILoadProviderByIdRepository {
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

  async loadAll(): Promise<LoadProvidersRepository.Result[]> {
    const avgStar = knexHelper.knex.select('id_provider')
      .avg('star as average')
      .from('rates')
      .groupBy('id_provider')
      .as('rates_avg');

    const providers = await knexHelper
      .knex('providers')
      .select('*').leftJoin(avgStar, 'providers.id', 'rates_avg.id_provider');

    return providers;
  }

  async loadById(id: string): Promise<IProviderProfile> {
    const provider = await knexHelper.knex('providers')
      .innerJoin('rates', 'providers.id', '=', 'rates.id_provider')
      .where('providers.id', id);

    const averageStarsArray = await knexHelper.knex('rates').avg('star').where('id_provider', id);
    const averageStars = Number(averageStarsArray[0].avg.toFixed(2));

    return {
      provider,
      averageStars,
    };
  }
}
