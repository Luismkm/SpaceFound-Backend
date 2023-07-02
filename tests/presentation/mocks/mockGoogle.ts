import { ICreateUserByGoogleProvider } from '@/domain/usecases/login/ICreateUserByGoogleProvider';
import { IGoogleAuthentication } from '@/domain/usecases/login/IGoogleAuthentication';

type paramsType = {
  code: string
}

export class GoogleApiSpy {
  params: string
  result = {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email',
    picture: 'any_url',
  }

  async loadUser({ code }: paramsType): Promise<any> {
    this.params = code;
    return this.result;
  }
}

export class CreateGoogleAccountSpy implements ICreateUserByGoogleProvider {
  params: any
  result = true

  async create(params: any): Promise<any> {
    this.params = params;
    return this.result;
  }
}

export class GoogleAuthenticationSpy implements IGoogleAuthentication {
  params: any
  result = {
    accessToken: 'any_access_token',
  }

  async auth(params: any): Promise<any> {
    this.params = params;
    return this.result;
  }
}
