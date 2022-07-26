import DbCreateRate from '@/data/usecases/rate/DbCreateRate';
import { RatePostgresRepository } from '@/infra/database/postgres/rate/RatePostgresRepository';

import { ICreateRate } from '@/domain/usecases/rate/ICreateRate';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';

export const makeDbCreateRate = (): ICreateRate => {
  const uuidAdapter = new UuidAdapter();
  const ratePostgresRepository = new RatePostgresRepository();
  return new DbCreateRate(uuidAdapter, ratePostgresRepository);
};
