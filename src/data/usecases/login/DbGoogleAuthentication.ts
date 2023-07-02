import { IEncrypter } from '@/data/protocols/cryptography';
import { ILoadUserByEmailRepository } from '@/data/protocols/db/user/ILoadUserByEmailRepository';
import { IGoogleAuthentication, GoogleAuthentication } from '@/domain/usecases/login/IGoogleAuthentication';

export class DbGoogleAuthentication implements IGoogleAuthentication {
  constructor(
    private readonly loadUserByEmailRepository: ILoadUserByEmailRepository,
    private readonly encrypter: IEncrypter,
  ) {}

  async auth({ email }: GoogleAuthentication.Params): Promise<GoogleAuthentication.Result> {
    const account = await this.loadUserByEmailRepository.loadByEmail(email);
    if (account) {
      const accessToken = this.encrypter.encrypt({ sub: account.id, accountType: 'user' });
      return accessToken;
    }
    return null;
  }
}
