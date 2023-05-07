import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';
import { ICreateProviderAccount } from '@/domain/usecases/provider/ICreateProviderAccount';
import { DbCreateProviderAccount } from '@/data/usecases/provider/DbCreateProviderAccount';

export const makeDbCreateProvider = (): ICreateProviderAccount => {
  const uuidAdapter = new UuidAdapter();
  const providerPostgresRepository = new ProviderPostgresRepository();
  return new DbCreateProviderAccount(
    uuidAdapter,
    providerPostgresRepository,
    providerPostgresRepository,
    providerPostgresRepository,
  );
};
