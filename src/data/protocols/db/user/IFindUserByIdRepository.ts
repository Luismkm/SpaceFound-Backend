import { IUser } from '@/domain/models/IUser';

export interface IFindUserByIdRepository {
  findById(id: string): Promise<IUser | undefined>
}
