import { IProvider } from '@/domain/models/IProvider';

export type ICreateProviderDTO = Omit<IProvider, 'id'>

export interface ICreateProvider {
  create(provider: ICreateProviderDTO): Promise<IProvider>
}
