import { ICheckAccountByEmailRepository } from '@/data/protocols';
import { IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user/IUpdateUserProfileRepository';
import { IUpdateUserProfile } from '@/domain/usecases/user/IUpdateUserProfile';

export class DbUpdateUserProfile implements IUpdateUserProfile {
  constructor(
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
    private readonly updateUserProfileRepository: IUpdateUserProfileRepository,
  ) {}

  async update(userProfile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result> {
    let updated = false;
    const checkEmailInUse = await this.checkAccountByEmailRepository.checkByEmail(userProfile.email);
    if (!checkEmailInUse) {
      updated = await this.updateUserProfileRepository.update(userProfile);
    }
    return updated;
  }
}
