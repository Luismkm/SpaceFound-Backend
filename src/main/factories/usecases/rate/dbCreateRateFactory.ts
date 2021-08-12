import DbCreateRate from '@/data/usecases/rate/DbCreateRate';
import { RatePostgresRepository } from '@/infra/database/postgres/rate/RatePostgresRepository';

import { ICreateRate } from '@/domain/usecases/rate/ICreateRate';

export const makeDbCreateRate = (): ICreateRate => {
  const ratePostgresRepository = new RatePostgresRepository();
  return new DbCreateRate(ratePostgresRepository);
};
