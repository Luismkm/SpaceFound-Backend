import {
  CreateUserAccountRepository, ICreateAccountRepository,
  UpdateUserAvatarRepository, IUpdateAvatarRepository,
  LoadUserByEmailRepository, ILoadAccountByEmailRepository,
  CheckUserByEmailRepository, ICheckAccountByEmailRepository,
} from '@/data/protocols';

export class CreateAccountRepositorySpy implements ICreateAccountRepository {
  params: CreateUserAccountRepository.Params
  result = true

  async create(params: CreateUserAccountRepository.Params): Promise<CreateUserAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class UpdateAvatarRepositorySpy implements IUpdateAvatarRepository {
  params: UpdateUserAvatarRepository.Params
  result = 'any_url'

  async updateAvatar(params: UpdateUserAvatarRepository.Params): Promise<UpdateUserAvatarRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAccountByEmailRepositorySpy implements ILoadAccountByEmailRepository {
  email: string
  result = {
    id: 'any_uuid',
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    avatar: 'any_avatar',
  }

  async loadByEmail(email: string): Promise<LoadUserByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class CheckAccountByEmailRepositorySpy implements ICheckAccountByEmailRepository {
  params: string
  result: true

  async checkByEmail(email: string): Promise<CheckUserByEmailRepository.Result> {
    this.params = email;
    return this.result;
  }
}
