import { IDecrypter } from '@/data/protocols/cryptography/IDecrypter';
import { success, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { IHttpRequest, IHttpResponse, IMiddleware } from '@/presentation/protocols';

export class TokenValidation implements IMiddleware {
  constructor(private readonly decrypter: IDecrypter) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token'];

      if (accessToken) {
        const decoded = this.decrypter.decrypt(accessToken);

        if (decoded) {
          const { sub } = decoded;
          return success({ user: sub });
        }
      }
    } catch (error) {
      return unauthorized();
    }
  }
}
