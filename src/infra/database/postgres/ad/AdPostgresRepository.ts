import { knexHelper } from '@/infra/database/helpers';

import { CreateAdRepository, ICreateAdRepository } from '@/data/protocols/db/ad/ICreateAdRepository';
import { IAd } from '@/domain/models/IAd';
import { FindAdsByAccountRepository, IFindAdsByAccountRepository } from '@/data/protocols/db/ad/FindAdsByAccountRepository';

export class AdPostgresRepository implements ICreateAdRepository, IFindAdsByAccountRepository {
  async create(params: CreateAdRepository.Params): Promise<CreateAdRepository.Result> {
    const { id, accountId, title, description, createdAt, serviceId } = params;
    const adCreated = await knexHelper.knex('ad').insert({ id, account_id: accountId, title, description, service_id: serviceId, created_at: createdAt }).returning('id');
    return adCreated !== null;
  }

  async listByAccount(params: FindAdsByAccountRepository.Params): Promise<FindAdsByAccountRepository.Result> {
    const rows = await knexHelper.knex<IAd>('ad').select('*').where('account_id', params.accountId)
    console.log(rows)
    return rows
  }
}
