import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';

export interface ILoadProviderByIdRepository {
  loadById(id: string): Promise<IProviderProfile>
}
