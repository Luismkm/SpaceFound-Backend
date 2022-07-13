import { IUpdateAvatar, UpdateAvatar } from '@/domain/usecases/user/IUpdateAvatar';

export class UpdateAvatarStub implements IUpdateAvatar {
  result = 'any_result'

  async updateAvatar(): Promise<UpdateAvatar.Result> {
    return this.result;
  }
}
