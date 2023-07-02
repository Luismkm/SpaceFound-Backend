import { IEncrypter, IHashComparer } from '@/data/protocols/cryptography';
import { ILoadUserByEmailRepository } from '@/data/protocols/db/user/ILoadUserByEmailRepository';
import { IAuthentication, Authentication } from '@/domain/usecases/user';

export class DbAuthentication implements IAuthentication {
  constructor(
    private readonly loadUsertByEmailRepository: ILoadUserByEmailRepository,
    private readonly hashComparer: IHashComparer,
    private readonly encrypter: IEncrypter,
  ) {}

  async auth(authenticationParams: Authentication.Params): Promise<Authentication.Result> {
    const account = await this.loadUsertByEmailRepository.loadByEmail(authenticationParams.email);
    if (account) {
      const isValid = await this.hashComparer.compare(authenticationParams.password, account.password);
      if (isValid) {
        const accessToken = this.encrypter.encrypt({ sub: account.id, accountType: 'user' });
        return accessToken;
      }
    }
    return null;
  }
}
