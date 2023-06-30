import {
  FindUserByIdRepository, IFindUserByIdRepository,
  LoadUserByEmailRepository, ILoadUserByEmailRepository,
  IUpdateUserProfileRepository, UpdateUserProfileRepository,
} from '@/data/protocols/db/user';

export class FindUserByIdRepositorySpy implements IFindUserByIdRepository {
  id: string
  result = {
    id: 'any_uuid',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    avatar: 'any_avatar',
    cityId: 1,
    createdAt: new Date(),
  }

  async findById(id: string): Promise<FindUserByIdRepository.Result> {
    this.id = id
    return this.result
  }
}

export class LoadUserByEmailRepositorySpy implements ILoadUserByEmailRepository {
  params: string
  result = {
    id: 'any_uuid',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    avatar: 'any_avatar',
    cityId: 1,
    createdAt: new Date(),
  }

  async loadByEmail(params: string): Promise<LoadUserByEmailRepository.Result> {
    this.params = params
    return this.result
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
