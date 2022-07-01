import { IAccount } from '@/domain/models/IAccount';

export interface IUpdateAvatar {
  updateAvatar(userId:string, fileName: string): Promise <IAccount | undefined>
}
