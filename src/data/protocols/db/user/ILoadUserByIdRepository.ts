import { IAccount } from '@/domain/models/IAccount';

export interface ILoadUserByIdRepository {
  loadById(id: string): Promise<IAccount | undefined>
}
