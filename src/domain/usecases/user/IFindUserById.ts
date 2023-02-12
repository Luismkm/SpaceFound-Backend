import { IUser } from '@/domain/models/IUser';

export interface IFindUserById {
  findById(id: string): Promise <IUser | undefined>
}
