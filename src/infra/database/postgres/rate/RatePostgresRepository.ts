import { knexHelper } from '@/infra/database/helpers';

import { ICreateRateRepository } from '@/data/protocols/db/rate/ICreateRateRepository';
import { IRate } from '@/domain/models/IRate';
import { ICreateRateDTO } from '@/domain/usecases/rate/ICreateRate';

export class RatePostgresRepository implements ICreateRateRepository {
  async create(rate: ICreateRateDTO): Promise<IRate> {
    const {
      idUser, idProvider, star, comment,
    } = rate;
    const rateCreated = await knexHelper.knex('rates').insert({
      id_user: idUser, id_provider: idProvider, star, comment,
    }).returning('*');

    return rateCreated[0];
  }
}
