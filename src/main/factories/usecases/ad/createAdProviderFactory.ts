import { DbCreateAd } from '@/data/usecases/ad/DbCreateAd';
import { ICreateAd } from '@/domain/usecases/ad/ICreateAd';
import { AdPostgresRepository } from '@/infra/database/postgres/ad/AdPostgresRepository';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';

export const makeDbCreateAd = (): ICreateAd => {
  const uuidAdapter = new UuidAdapter();
  const postgresAdRepository = new AdPostgresRepository();
  return new DbCreateAd(uuidAdapter, postgresAdRepository);
};
