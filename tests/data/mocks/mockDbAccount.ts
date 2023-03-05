import {
  CreateUserAccountRepository, ICreateUserAccountRepository,
  LoadUserByEmailRepository, ILoadUserByEmailRepository, ICheckAccountByEmailRepository, CheckAccountByEmailRepository,
} from '@/data/protocols';
import { IUpdateAvatarRepository, UpdateAccountAvatarRepository } from '@/data/protocols/db/account/IUpdateAccountAvatarRepository';

export class CreateAccountRepositorySpy implements ICreateUserAccountRepository {
  params: CreateUserAccountRepository.Params
  result = true

  async create(params: CreateUserAccountRepository.Params): Promise<CreateUserAccountRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class UpdateAvatarRepositorySpy implements IUpdateAvatarRepository {
  params: UpdateAccountAvatarRepository.Params
  result = true

  async updateAvatar(params: UpdateAccountAvatarRepository.Params): Promise<UpdateAccountAvatarRepository.Result> {
    this.params = params;
    return this.result;
  }
}

export class LoadAccountByEmailRepositorySpy implements ILoadUserByEmailRepository {
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

  async checkByEmail(email: string): Promise<CheckAccountByEmailRepository.Result> {
    this.params = email;
    return this.result;
  }
}
