import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import { IAuthentication, IAuthenticationDTO } from './DbAuthenticationProtocols';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) {}

  async auth(authentication: IAuthenticationDTO): Promise<string> {
    await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
    return null;
  }
}
