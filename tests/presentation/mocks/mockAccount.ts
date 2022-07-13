import { Authentication, IAuthentication } from '@/domain/usecases/account/IAuthentication';
import { CreateAccount, ICreateAccount } from '@/domain/usecases/account/ICreateAccount';
import { IUpdateAvatar, UpdateAvatar } from '@/domain/usecases/account/IUpdateAvatar';

export class CreateAccountSpy implements ICreateAccount {
  params: CreateAccount.Params
  result = true

  async create(params: CreateAccount.Params): Promise<CreateAccount.Result> {
    this.params = params;
    return this.result;
  }
}

export class UpdateAvatarSpy implements IUpdateAvatar {
  params: UpdateAvatar.Params
  result = 'any_url'

  async updateAvatar(params: UpdateAvatar.Params): Promise<UpdateAvatar.Result> {
    this.params = {
      userId: params.userId,
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
