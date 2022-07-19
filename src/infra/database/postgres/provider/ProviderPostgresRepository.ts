import { knexHelper } from '@/infra/database/helpers';
import { CreateProviderRepository } from '@/data/protocols';
import { ICreateProviderRepository, ILoadProviderByIdRepository, ILoadProvidersRepository, LoadProvidersRepository } from './ProviderPostgresRepositoryProtocols';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';

export class ProviderPostgresRepository implements
  ICreateProviderRepository,
  ILoadProvidersRepository,
  ILoadProviderByIdRepository {
  async create(params: CreateProviderRepository.Params): Promise<CreateProviderRepository.Result> {
    const { id, name, description, createdAt, serviceId, cnpj, userId } = params;
    let providerCreated;
    let insertedService;

    await knexHelper.knex.transaction(async (trx) => {
      providerCreated = await trx('provider')
        .insert({ id, name, description, cnpj, user_id: userId, created_at: createdAt })
        .returning('*');

      insertedService = await trx('provider_service').insert({ provider_id: id, service_id: serviceId });
    });

    if (providerCreated && insertedService) {
      return true;
    }
    return false;
  }

  async loadAll(): Promise<LoadProvidersRepository.Result[]> {
    const avgStar = knexHelper.knex.select('id_provider')
      .avg('star as average')
      .from('rates')
      .groupBy('id_provider')
      .as('rates_avg');

    const providers = await knexHelper
      .knex('provider')
      .select('*').leftJoin(avgStar, 'provider.id', 'rates_avg.id_provider');

    return providers;
  }

  async loadById(id: string): Promise<IProviderProfile> {
    const provider = await knexHelper.knex('provider')
      .innerJoin('rates', 'provider.id', '=', 'rates.id_provider')
      .where('provider.id', id);

    const averageStarsArray = await knexHelper.knex('rates').avg('star').where('id_provider', id);
    const averageStars = Number(averageStarsArray[0].avg.toFixed(2));

    return {
      provider,
      averageStars,
    };
  }
}
