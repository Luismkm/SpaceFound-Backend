import { IEncrypter } from '@/data/protocols/cryptography/IEncrypter';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import { IAuthentication, IAuthenticationDTO, IHashComparer } from './DbAuthenticationProtocols';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
  ) {}

  async auth(authentication: IAuthenticationDTO): Promise<string> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(authentication.email);
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password);
      if (isValid) {
        const accessToken = this.encrypter.encrypt(account.id);
        return accessToken;
      }
    }
    return null;
  }
}
