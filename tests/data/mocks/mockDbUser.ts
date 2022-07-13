import { IFindUserByIdRepository } from '@/data/protocols/db/user';
import { IAccount } from '@/domain/models/IAccount';

import { mockAccount } from '@/tests/domain/mocks';
import { IUpdateAvatarRepository } from '@/data/protocols/db';

export const mockFindUserByIdRepository = (): IFindUserByIdRepository => {
  class FindUserByIdRepositoryStub implements IFindUserByIdRepository {
    async findById(id: string): Promise<IAccount | undefined> {
      return Promise.resolve(mockAccount());
    }
  }
  return new FindUserByIdRepositoryStub();
};

/* export const mockUpdateAvatarRepository = (): IUpdateAvatarRepository => {
  class FindUserByIdRepositoryStub implements IUpdateAvatarRepository {
    async updateAvatar(): Promise<UpdateAvatarRepository.Result> {
      return Promise.resolve({
        avatar: 'updated_avatar',
      });
    }
  }
  return new FindUserByIdRepositoryStub();
};
 */
