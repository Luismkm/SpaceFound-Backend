import { ICheckAccountByEmailRepository } from '@/data/protocols';
import { IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user/IUpdateProfileRepository';
import { IUpdateUserProfile } from '@/domain/usecases/user/IUpdateUserProfile';

export class DbUpdateUserProfile implements IUpdateUserProfile {
  constructor(
    private readonly checkAccountByEmailRepository: ICheckAccountByEmailRepository,
    /*  private readonly updateUserProfileRepository: IUpdateUserProfileRepository, */
  ) {}

  async update(userProfile: UpdateUserProfileRepository.Params): Promise<any> {
    const checkEmailInUse = await this.checkAccountByEmailRepository.checkByEmail(userProfile.email);

    /* if (!checkEmailInUse) {
      const hasBeenUpdated = await this.updateUserProfileRepository.update(userProfile);
      return hasBeenUpdated;
    }

    return false; */
  }
}
