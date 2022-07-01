import { IAccount } from '@/domain/models/IAccount';
import { IUpdateUserProfileDTO } from '@/domain/usecases/protocols/IUserProfileDTO';

export interface IUpdateUserProfileRepository {
  update(profile: IUpdateUserProfileDTO): Promise<IAccount>
}
