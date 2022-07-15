import { IUpdateAvatarRepository } from '@/data/protocols/db';
import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateAvatar, UpdateAvatar } from '@/domain/usecases/account/IUpdateAvatar';
import { IStorageProvider } from '../user/DbUserProtocols';

export class DbUpdateAvatar implements IUpdateAvatar {
  constructor(
    private readonly storageProvider: IStorageProvider,
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly updateAvatarRepository: IUpdateAvatarRepository,
  ) {}

  async updateAvatar({ userId, fileName }: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    const user = await this.findUserByIdRepository.findById(userId);
    if (!user) return null;
    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);
    const fileUpadated = await this.storageProvider.saveFile(fileName);
    const avatar = await this.updateAvatarRepository.updateAvatar({ userId, fileName: fileUpadated });
    return avatar;
  }
}
