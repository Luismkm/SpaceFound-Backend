import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateAvatarRepository } from '@/data/protocols/db/user/IUpdateAvatarRepository';
import { IStorageProvider } from '@/data/protocols/storageProvider/IStorageProvider';
import { IUpdateAvatar } from '@/domain/usecases/user/IUpdateAvatar';
import { IAccount } from '@/domain/models/IAccount';

export class DbUpdateAvatar implements IUpdateAvatar {
  constructor(
    private readonly storageProvider: IStorageProvider,
    private readonly findUserByIdRepository: IFindUserByIdRepository,
    private readonly updateAvatarRepository: IUpdateAvatarRepository,
  ) {}

  async update(userId:string, avatarFileName: string): Promise<IAccount> {
    const user = await this.findUserByIdRepository.findById(userId);

    if (!user) {
      return null;
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;
    await this.updateAvatarRepository.update(userId, filename);
    return user;
  }
}
