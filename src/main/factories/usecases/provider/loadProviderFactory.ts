import { DbLoadProfileById } from '@/data/usecases/provider/DbLoadProfileById';
import { DbLoadAllProviders } from '@/data/usecases/provider/DbLoadAllProviders';
import { ILoadProfileById } from '@/domain/usecases/provider/ILoadProfileById';
import { ILoadAllProviders } from '@/domain/usecases/provider/ILoadAllProviders';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';

export const makeDbLoadAllProviders = (): ILoadAllProviders => {
  const loadProvidersPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadAllProviders(loadProvidersPostgresRepository);
};

export const makeDbLoadProfileById = (): ILoadProfileById => {
  const loadProfileByIdPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProfileById(loadProfileByIdPostgresRepository);
};

/* export const makeDbLoadProviderById = (): ILoadProviderById => {
  const loadProviderByIdPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviderById(loadProviderByIdPostgresRepository);
}; */
