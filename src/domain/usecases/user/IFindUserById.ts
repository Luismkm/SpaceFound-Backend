import { IAccount } from '@/domain/models/IAccount';

export interface IFindUserById {
  findById(id: string): Promise <IAccount | undefined>
}
