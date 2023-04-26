import { knexHelper } from '@/infra/database/helpers';
import { CreateProviderAccountRepository, ICreateProviderAccountRepository, ILoadProfileByIdRepository, ILoadAllProvidersRepository, LoadAllProvidersRepository, LoadProfileByIdRepository } from '@/data/protocols';
import { IUpdateAvatarRepository, UpdateAccountAvatarRepository } from '@/data/protocols/db/account/IUpdateAccountAvatarRepository';
import { ILoadProviderByIdRepository } from '@/data/protocols/db/provider/ILoadProviderByIdRepository';
import { ICheckProviderById } from '@/domain/usecases/provider/ICheckProviderById';

export class ProviderPostgresRepository implements
  ICreateProviderAccountRepository,
  ILoadAllProvidersRepository,
  ILoadProfileByIdRepository,
  ILoadProviderByIdRepository,
  IUpdateAvatarRepository,
  ICheckProviderById {
  async create(params: CreateProviderAccountRepository.Params): Promise<CreateProviderAccountRepository.Result> {
    const { id, name, description, email, createdAt, serviceId, cnpj } = params;
    let providerCreated: any;
    let insertedService: any;

    await knexHelper.knex.transaction(async (trx) => {
      providerCreated = await trx('provider').insert({ id, name, description, email, cnpj, created_at: createdAt }).returning('*');
      insertedService = await trx('provider_service').insert({ provider_id: id, service_id: serviceId }).returning('*');
    });

    if (providerCreated.length === 1 && insertedService.length === 1) return true;
  }

  async loadAll(): Promise<LoadAllProvidersRepository.Result[]> {
    const avgStar = knexHelper.knex('rate')
      .select('provider_id')
      .avg('star as average')
      .groupBy('provider_id')
      .as('rate_avg');

    const providers = await knexHelper.knex('provider')
      .select({ providerId: 'provider.id' }, 'provider.name', 'description', 'avatar', knexHelper.knex.raw('coalesce(average, 0) as average'), { service: 'service.name' })
      .from('provider')
      .leftJoin(avgStar, 'provider.id', 'rate_avg.provider_id')
      .innerJoin('provider_service', 'provider.id', 'provider_service.provider_id')
      .innerJoin('service', 'provider_service.service_id', 'service.id')

    return providers;
  }

  async loadProfileById(id: string): Promise<LoadProfileByIdRepository.Result> {
    const provider = await knexHelper.knex.select('*').from('provider').where('provider.id', id);
    const averageStarsArray = await knexHelper.knex('rate').avg('star').where('provider_id', id);
    const { avg } = averageStarsArray[0];
    const averageStars = avg !== null ? averageStarsArray[0].avg : 0;
    const { service_id, created_at, updated_at, ...rest } = provider[0]
    return { averageStars, serviceId: service_id, createdAt: created_at, updatedAt: updated_at, ...rest };
  }

  async loadById(id: string): Promise<any> {
    const provider = await knexHelper.knex.select('*').from('provider').where('provider.id', id);
    const averageStarsArray = await knexHelper.knex('rate').avg('star').where('provider_id', id);
    const { avg } = averageStarsArray[0];
    const averageStars = avg !== null ? averageStarsArray[0].avg : 0;
    const result = { averageStars, ...provider[0] };
    return result;
  }

  async updateAvatar({ accountId, filename }: UpdateAccountAvatarRepository.Params): Promise<UpdateAccountAvatarRepository.Result> {
    const asReturn = await knexHelper.knex('provider').update('avatar', filename).where('id', accountId).limit(1)
    return asReturn !== null;
  }

  async checkProviderById(id: string): Promise<boolean> {
    const provider = await knexHelper.knex('provider').where('id', id);
    return provider.length > 1
  }

  /* async findById(param: string): Promise<LoadProviderByIdRepository.Result> {
    const provider = await knexHelper.knex<IProvider>('provider').where('id', param);
    const { id, avatar } = provider[0]
    return { id, avatar }
  } */
}
