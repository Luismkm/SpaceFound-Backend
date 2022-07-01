import { IAccount } from '@/domain/models/IAccount';
import { IUpdateUserProfileDTO } from '../protocols/IUserProfileDTO';

export interface IUpdateProfile {
  update(user: IUpdateUserProfileDTO): Promise<IAccount>
}
