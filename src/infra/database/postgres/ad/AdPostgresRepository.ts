import { knexHelper } from '@/infra/database/helpers';

import { CreateAdRepository, ICreateAdRepository } from '@/data/protocols/db/ad/ICreateAdRepository';

export class AdPostgresRepository implements ICreateAdRepository {
  async create(params: CreateAdRepository.Params): Promise<CreateAdRepository.Result> {
    const { id, title, description, createdAt, userId } = params;
    const adCreated = await knexHelper.knex('ad').insert({ id, title, description, created_at: createdAt, user_id: userId }).returning('id');
    return adCreated.length === 1;
  }
}
