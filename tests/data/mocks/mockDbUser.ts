import { FindUserByIdRepository, IFindUserByIdRepository, IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user';

import { mockAccount } from '@/tests/domain/mocks';

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  async findById(params: FindUserByIdRepository.Params): Promise<FindUserByIdRepository.Result> {
    return Promise.resolve(mockAccount());
  }
}

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
