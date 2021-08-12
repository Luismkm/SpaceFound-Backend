import { DbLoadProviders } from '@/data/usecases/provider/DbLoadProviders';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';

import { ILoadProviders } from '@/domain/usecases/provider/ILoadProviders';

export const makeDbLoadProviders = (): ILoadProviders => {
  const loadProvidersPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviders(loadProvidersPostgresRepository);
};
