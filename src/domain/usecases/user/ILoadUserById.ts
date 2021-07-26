import { IAccount } from '@/domain/models/IAccount';

export interface ILoadUserById {
  loadById(id: string): Promise <IAccount | undefined>
}
