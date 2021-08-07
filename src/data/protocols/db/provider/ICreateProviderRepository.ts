import { IProvider } from '@/domain/models/IProvider';

export interface ICreateProviderRepository {
  create(provider: IProvider): Promise<IProvider>
}
