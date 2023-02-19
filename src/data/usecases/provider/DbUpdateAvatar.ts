import { IFindProviderByIdRepository } from '@/data/protocols/db/provider/IFindProviderByIdRepository';
import { IStorageProvider } from '@/data/usecases/user/DbUserProtocols';
import { IUpdateAvatarRepository } from '@/data/protocols/db/account/IUpdateAccountAvatarRepository';
import { IUpdateAvatar, UpdateAvatar } from '@/domain/usecases/account/IUpdateAvatar';

export class DbUpdateAvatar implements IUpdateAvatar {
  constructor(
    private readonly storageProvider: IStorageProvider,
    private readonly findProviderByIdRepository: IFindProviderByIdRepository,
    private readonly updateAvatarRepository: IUpdateAvatarRepository,
  ) {}

  async updateAvatar({ accountId, fileName }: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    const user = await this.findProviderByIdRepository.findById(accountId);
    if (!user) return null;
    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);
    const fileUpadated = await this.storageProvider.saveFile(fileName);
    const avatar = await this.updateAvatarRepository.updateAvatar({ accountId, fileName: fileUpadated });
    return avatar;
  }
}
