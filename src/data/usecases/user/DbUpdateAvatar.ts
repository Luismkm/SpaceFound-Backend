import { IFindUserByIdRepository } from '@/data/protocols/db';
import { IStorageProvider } from '@/data/usecases/user/DbUserProtocols';
import { IUpdateAvatarRepository } from '@/data/protocols/db/account/IUpdateAccountAvatarRepository';
import { IUpdateAvatar, UpdateAvatar } from '@/domain/usecases/account/IUpdateAvatar';

export class DbUpdateAvatar implements IUpdateAvatar {
  constructor(
    private readonly storageProvider: IStorageProvider,
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly updateAvatarRepository: IUpdateAvatarRepository,
  ) {}

  async updateAvatar({ accountId, filename }: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    const user = await this.findUserByIdRepository.findById(accountId);
    if (!user) return null;
    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);
    const fileUpadated = await this.storageProvider.saveFile(filename);
    const avatar = await this.updateAvatarRepository.updateAvatar({ accountId, filename: fileUpadated });
    return avatar;
  }
}
