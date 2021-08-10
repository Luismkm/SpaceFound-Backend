import { IProvider } from '@/domain/models/IProvider';

export interface ILoadProvidersRepository {
  loadAll(): Promise<IProvider[]>
}
