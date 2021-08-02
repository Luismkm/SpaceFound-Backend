import { IAccount } from '@/domain/models/IAccount';

export interface IFindUserByIdRepository {
  findById(id: string): Promise<IAccount | undefined>
}
