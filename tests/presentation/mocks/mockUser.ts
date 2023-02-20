import { IUpdateAvatar, UpdateAvatar } from '@/domain/usecases/account/IUpdateAvatar';
import { Authentication, IAuthentication } from '@/domain/usecases/user/IAuthentication';
import { CreateUserAccount, ICreateUserAccount } from '@/domain/usecases/user/ICreateUserAccount';

export class CreateAccountSpy implements ICreateUserAccount {
  params: CreateUserAccount.Params
  result = true

  async create(params: CreateUserAccount.Params): Promise<CreateUserAccount.Result> {
    this.params = params;
    return this.result;
  }
}

export class UpdateAvatarSpy implements IUpdateAvatar {
  params: UpdateAvatar.Params
  result = true

  async updateAvatar(params: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    this.params = {
      accountId: params.accountId,
      fileName: params.fileName,
    };
    return this.result;
  }
}

export class AuthenticationSpy implements IAuthentication {
  params: Authentication.Params
  result = {
    accessToken: 'any_access_token',
    name: 'any_name',
  }

  async auth(params: Authentication.Params): Promise<Authentication.Result> {
    this.params = params;
    return this.result;
  }
}
