import { IFindUserByIdRepository, IUpdateAvatarRepository } from '@/data/protocols/db/user';
import { IAccount } from '@/domain/models/IAccount';

import { mockAccount } from '@/tests/domain/mocks';

type Output = {
  avatar: string
}

export const mockFindUserByIdRepository = (): IFindUserByIdRepository => {
  class FindUserByIdRepositoryStub implements IFindUserByIdRepository {
    async findById(id: string): Promise<IAccount | undefined> {
      return Promise.resolve(mockAccount());
    }
  }
  return new FindUserByIdRepositoryStub();
};

export const mockUpdateAvatarRepository = (): IUpdateAvatarRepository => {
  class FindUserByIdRepositoryStub implements IUpdateAvatarRepository {
    async updateAvatar(id: string): Promise<Output> {
      return Promise.resolve({
        avatar: 'updated_avatar',
      });
    }
  }
  return new FindUserByIdRepositoryStub();
};
