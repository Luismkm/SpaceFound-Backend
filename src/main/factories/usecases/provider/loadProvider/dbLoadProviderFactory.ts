import { DbLoadProviderById } from '@/data/usecases/provider/DbLoadProviderById';
import { DbLoadProviders } from '@/data/usecases/provider/DbLoadProviders';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';

import { ILoadProviders } from '@/domain/usecases/provider/ILoadProviders';
import { ILoadProviderById } from '@/domain/usecases/provider/ILoadProviderById';

export const makeDbLoadProviders = (): ILoadProviders => {
  const loadProvidersPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviders(loadProvidersPostgresRepository);
};

export const makeDbLoadProviderById = (): ILoadProviderById => {
  const loadProviderByIdPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviderById(loadProviderByIdPostgresRepository);
};
