import { DbLoadProviderById } from '@/data/usecases/provider/DbLoadProviderById';
import { DbLoadProviders } from '@/data/usecases/provider/DbLoadProviders';
import { ILoadProviderById } from '@/domain/usecases/provider/ILoadProviderById';
import { ILoadProviders } from '@/domain/usecases/provider/ILoadProviders';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';

export const makeDbLoadProviders = (): ILoadProviders => {
  const loadProvidersPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviders(loadProvidersPostgresRepository);
};

export const makeDbLoadProviderById = (): ILoadProviderById => {
  const loadProviderByIdPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviderById(loadProviderByIdPostgresRepository);
};
