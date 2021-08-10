import { DbLoadProviders } from '@/data/usecases/provider/DbLoadProviders';
import { ILoadProviders } from '@/domain/usecases/provider/ILoadProviders';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';

export const makeDbLoadProviders = (): ILoadProviders => {
  const loadProvidersPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviders(loadProvidersPostgresRepository);
};
