import { IStorageProvider } from '@/data/usecases/user/DbUserProtocols';
import { IUpdateAvatarRepository } from '@/data/protocols/db/provider/IUpdateAccountAvatarRepository';
import { IUpdateAvatar, UpdateAvatar } from '@/domain/usecases/provider/IUpdateAvatar';
import { ILoadProfileByIdRepository } from '@/data/protocols';

export class DbUpdateAvatar implements IUpdateAvatar {
  constructor(
    private readonly storageProvider: IStorageProvider,
    private readonly findProviderByIdRepository: ILoadProfileByIdRepository,
    private readonly updateAvatarRepository: IUpdateAvatarRepository,
  ) {}

  async updateAvatar({ accountId, filename }: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    const provider = await this.findProviderByIdRepository.loadProfileById(accountId);
    if (!provider) return null;
    if (provider.avatar) await this.storageProvider.deleteFile(provider.avatar);
    const fileUpadated = await this.storageProvider.saveFile(filename);
    const avatar = await this.updateAvatarRepository.updateAvatar({ accountId, filename: fileUpadated });
    return avatar;
  }
}
