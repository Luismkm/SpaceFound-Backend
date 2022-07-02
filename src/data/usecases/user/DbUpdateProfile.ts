import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user/IUpdateProfileRepository';
import { IUpdateUserProfileDTO } from '@/domain/usecases/protocols/IUserProfileDTO';
import { IAccount, IUpdateProfile } from './DbUserProtocols';

export class DbUpdateUserProfile implements IUpdateProfile {
  constructor(
    private readonly updateUserProfileRepository: IUpdateUserProfileRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) {}

  async update(userProfile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result> {
    /*  const user = await this.findUserByIdRepository.findById(userProfile.userId);

    if (!user) {
      return null;
    } */

    const checkEmailInUse = await this.loadAccountByEmailRepository.loadByEmail(userProfile.email);

    if (!checkEmailInUse) {
      const user = await this.updateUserProfileRepository.update(userProfile);

      return user;
    }

    return null;
  }
}
