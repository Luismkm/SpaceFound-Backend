import { IFindUserByIdRepository, IUpdateAvatarRepository } from '@/data/protocols/db/user';
import { IAccount } from '@/domain/models/IAccount';

import { mockAccount } from '@/tests/domain/mocks';

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
    async update(id: string): Promise<IAccount | undefined> {
      return Promise.resolve({
        id: 'any_uuid',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        avatar: 'updated_avatar',
      });
    }
  }
  return new FindUserByIdRepositoryStub();
};
