import { knexHelper } from '@/infra/database/helpers';
import { CreateProviderRepository, ICreateProviderRepository, ILoadProviderByIdRepository, ILoadProvidersRepository, LoadProvidersRepository } from '@/data/protocols';

export class ProviderPostgresRepository implements
  ICreateProviderRepository,
  ILoadProvidersRepository,
  ILoadProviderByIdRepository {
  async create(params: CreateProviderRepository.Params): Promise<CreateProviderRepository.Result> {
    const { id, name, description, createdAt, serviceId, cnpj, userId } = params;
    let providerCreated: any;
    let insertedService: any;

    await knexHelper.knex.transaction(async (trx) => {
      providerCreated = await trx('provider').insert({ id, name, description, cnpj, user_id: userId, created_at: createdAt }).returning('*');
      insertedService = await trx('provider_service').insert({ provider_id: id, service_id: serviceId }).returning('*');
    });

    if (providerCreated.length === 1 && insertedService.length === 1) return true;
  }

  async loadAll(): Promise<LoadProvidersRepository.Result[]> {
    const avgStar = knexHelper.knex.select('provider_id')
      .avg('star as average')
      .from('rate')
      .groupBy('provider_id')
      .as('rate_avg');

    const providers = await knexHelper
      .knex('provider')
      .select('*').leftJoin(avgStar, 'provider.id', 'rate_avg.provider_id');

    return providers;
  }

  async loadById(id: string): Promise<any> {
    const provider = await knexHelper.knex.select('*').from('provider').where('provider.id', id);
    const averageStarsArray = await knexHelper.knex('rate').avg('star').where('provider_id', id);
    const { avg } = averageStarsArray[0];
    const averageStars = avg !== null ? averageStarsArray[0].avg : 0;
    const result = { averageStars, ...provider[0] };
    return result;
  }
}
