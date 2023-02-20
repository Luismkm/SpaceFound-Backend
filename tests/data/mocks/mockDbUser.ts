import { FindUserByIdRepository, IFindUserByIdRepository, IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user';

import { mockUser } from '@/tests/domain/mocks';

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  async findById(params: FindUserByIdRepository.Params): Promise<FindUserByIdRepository.Result> {
    return Promise.resolve(mockUser());
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
