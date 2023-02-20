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
    const provider = await this.findProviderByIdRepository.findById(accountId);
    if (!provider) return null;
    if (provider.avatar) await this.storageProvider.deleteFile(provider.avatar);
    const fileUpadated = await this.storageProvider.saveFile(fileName);
    const avatar = await this.updateAvatarRepository.updateAvatar({ accountId, fileName: fileUpadated });
    return avatar;
  }
}
