import {
  CreateAccountRepository, ICreateAccountRepository,
  UpdateAvatarRepository, IUpdateAvatarRepository,
  LoadAccountByEmailRepository, ILoadAccountByEmailRepository,
  CheckAccountByEmailRepository, ICheckAccountByEmailRepository,
} from '@/data/protocols';

export class CreateAccountRepositorySpy implements ICreateAccountRepository {
  params: CreateAccountRepository.Params
  result = true

  async create(params: CreateAccountRepository.Params): Promise<CreateAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class UpdateAvatarRepositorySpy implements IUpdateAvatarRepository {
  params: UpdateAvatarRepository.Params
  result = 'any_url'

  async updateAvatar(params: UpdateAvatarRepository.Params): Promise<UpdateAvatarRepository.Result> {
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

  async loadByEmail(email: string): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email;
    return this.result;
  }
}

export class CheckAccountByEmailRepositorySpy implements ICheckAccountByEmailRepository {
  params: string
  result: boolean

  async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.params = email;
    return this.result;
  }
}
