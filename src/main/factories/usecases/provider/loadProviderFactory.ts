import { DbLoadProfileById } from '@/data/usecases/provider/DbLoadProfileById';
import { DbLoadProviders } from '@/data/usecases/provider/DbLoadProviders';
import { ILoadProfileById } from '@/domain/usecases/provider/ILoadProfileById';
import { ILoadProviderById } from '@/domain/usecases/provider/ILoadProviderById';
import { ILoadProviders } from '@/domain/usecases/provider/ILoadAllProviders';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';

export const makeDbLoadProviders = (): ILoadProviders => {
  const loadProvidersPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviders(loadProvidersPostgresRepository);
};

export const makeDbLoadProfileById = (): ILoadProfileById => {
  const loadProfileByIdPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProfileById(loadProfileByIdPostgresRepository);
};

/* export const makeDbLoadProviderById = (): ILoadProviderById => {
  const loadProviderByIdPostgresRepository = new ProviderPostgresRepository();
  return new DbLoadProviderById(loadProviderByIdPostgresRepository);
}; */
