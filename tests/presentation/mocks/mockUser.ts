import { IAccount } from '@/domain/models/IAccount';
import { IUpdateAvatar } from '@/domain/usecases/user/IUpdateAvatar';

import { mockAccount } from '@/tests/domain/mocks/mockAccount';

export const mockUpdateAvatar = ():IUpdateAvatar => {
  class UpdateAvatarStub implements IUpdateAvatar {
    async update(): Promise<IAccount> {
      return Promise.resolve(mockAccount());
    }
  }
  return new UpdateAvatarStub();
};
