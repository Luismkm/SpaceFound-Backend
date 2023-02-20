import { knexHelper } from '@/infra/database/helpers';
import { CreateProviderAccountRepository, ICreateProviderAccountRepository, ILoadProviderByIdRepository, ILoadProvidersRepository, LoadProvidersRepository } from '@/data/protocols';
import { IUpdateAvatarRepository, UpdateAccountAvatarRepository } from '@/data/protocols/db/account/IUpdateAccountAvatarRepository';
import { FindProviderByIdRepository, IFindProviderByIdRepository } from '@/data/protocols/db/provider/IFindProviderByIdRepository';
import { IProvider } from '@/domain/models/IProvider';

export class ProviderPostgresRepository implements
  ICreateProviderAccountRepository,
  ILoadProvidersRepository,
  ILoadProviderByIdRepository,
  IFindProviderByIdRepository,
  IUpdateAvatarRepository {
  async create(params: CreateProviderAccountRepository.Params): Promise<CreateProviderAccountRepository.Result> {
    const { id, name, description, createdAt, serviceId, cnpj } = params;
    let providerCreated: any;
    let insertedService: any;

    await knexHelper.knex.transaction(async (trx) => {
      providerCreated = await trx('provider').insert({ id, name, description, cnpj, created_at: createdAt }).returning('*');
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

  async updateAvatar({ accountId, fileName }: UpdateAccountAvatarRepository.Params): Promise<UpdateAccountAvatarRepository.Result> {
    const asReturn = await knexHelper.knex('provider').update('avatar', fileName).where('id', accountId).limit(1)
    return asReturn !== null;
  }

  async findById(param: string): Promise<FindProviderByIdRepository.Result> {
    const provider = await knexHelper.knex<IProvider>('provider').where('id', param);
    const { id, avatar } = provider[0]
    return { id, avatar }
  }
}
