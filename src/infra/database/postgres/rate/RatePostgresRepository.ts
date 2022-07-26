import { knexHelper } from '@/infra/database/helpers';

import { CreateRateRepository, ICreateRateRepository } from '@/data/protocols/db/rate/ICreateRateRepository';

export class RatePostgresRepository implements ICreateRateRepository {
  async create(rate: CreateRateRepository.Params): Promise<CreateRateRepository.Result> {
    const { userId, providerId, star, comment } = rate;
    const rateCreated = await knexHelper.knex('rate').insert({ user_id: userId, provider_id: providerId, star, comment }).returning('id');
    return rateCreated.length === 1;
  }
}
