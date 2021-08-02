import { IAccount } from '@/domain/models/IAccount';

export interface IUpdateAvatarRepository {
  update(userId: string, fileName: string): Promise<IAccount | undefined>
}
