import { RatePostgresRepository } from '@/infra/database/postgres/rate/RatePostgresRepository';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';
import { ICreateRate } from '@/domain/usecases/rate/ICreateRate';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';
import DbCreateRate from '@/data/usecases/rate/DbCreateRate';

export const makeDbCreateRate = (): ICreateRate => {
  const uuidAdapter = new UuidAdapter();
  const providerRepository = new ProviderPostgresRepository()
  const ratePostgresRepository = new RatePostgresRepository();
  return new DbCreateRate(uuidAdapter, providerRepository, ratePostgresRepository);
};
