import DbCreateRate from '@/data/usecases/rate/DbCreateRate';
import { ICreateRate } from '@/domain/usecases/rate/ICreateRate';
import { RatePostgresRepository } from '@/infra/database/postgres/rate/RatePostgresRepository';

export const makeDbCreateRate = (): ICreateRate => {
  const ratePostgresRepository = new RatePostgresRepository();
  return new DbCreateRate(ratePostgresRepository);
};
