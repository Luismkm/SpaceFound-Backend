import { IProvider } from '@/domain/models/IProvider';

export interface ILoadProviders {
  load(): Promise<IProvider[]>
}
