import DbCreateProvider from '@/data/usecases/provider/DbCreateProvider';
import { ICreateProvider } from '@/domain/usecases/provider/ICreateProvider';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';

export const makeDbCreateProvider = (): ICreateProvider => {
  const uuidAdapter = new UuidAdapter();
  const providerPostgresRepository = new ProviderPostgresRepository();
  return new DbCreateProvider(
    uuidAdapter,
    providerPostgresRepository,
  );
};
