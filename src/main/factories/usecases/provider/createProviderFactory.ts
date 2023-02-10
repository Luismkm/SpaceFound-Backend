import DbCreateProviderAccount from '@/data/usecases/provider/DbCreateAccountProvider';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';
import { ICreateAccountProvider } from '@/domain/usecases/provider/ICreateAccountProvider';

export const makeDbCreateProvider = (): ICreateAccountProvider => {
  const uuidAdapter = new UuidAdapter();
  const providerPostgresRepository = new ProviderPostgresRepository();
  return new DbCreateProviderAccount(
    uuidAdapter,
    providerPostgresRepository,
  );
};
