import { IFindUserByIdRepository, IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user';
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

export class UpdateUserProfileRepositorySpy implements IUpdateUserProfileRepository {
  params: UpdateUserProfileRepository.Params
  result = true

  async update(params: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result> {
    this.params = params;
    return this.result;
  }
}

/* export const mockUpdateAvatarRepository = (): IUpdateAvatarRepository => {
  class FindUserByIdRepositoryStub implements IUpdateAvatarRepository {
    async updateAvatar(): Promise<UpdateAvatarRepository.Result> {
      return Promise.resolve({
        avatar: 'updated_avatar',
      });
    }
  }
  return new FindUserByIdRepositoryStub();
}; */
