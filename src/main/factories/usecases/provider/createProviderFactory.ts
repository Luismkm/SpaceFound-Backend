import DbCreateProvider from '@/data/usecases/provider/DbCreateProvider';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';
import { ICreateProvider } from '@/domain/usecases/provider/ICreateProvider';

export const makeDbCreateProvider = (): ICreateProvider => {
  const uuidAdapter = new UuidAdapter();
  const providerPostgresRepository = new ProviderPostgresRepository();
  return new DbCreateProvider(
    uuidAdapter,
    providerPostgresRepository,
  );
};
