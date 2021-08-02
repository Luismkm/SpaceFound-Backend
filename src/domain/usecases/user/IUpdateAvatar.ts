import { IAccount } from '@/domain/models/IAccount';

export interface IUpdateAvatar {
  update(userId:string, fileName: string): Promise <IAccount | undefined>
}
