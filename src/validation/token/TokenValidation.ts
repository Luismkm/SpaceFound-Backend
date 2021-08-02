import { success, unauthorized } from '@/presentation/helpers/http/httpHelper';

import { IHttpRequest, IHttpResponse, IMiddleware } from '@/presentation/protocols';
import { IDecrypter } from '@/data/protocols/cryptography/IDecrypter';

export class TokenValidation implements IMiddleware {
  constructor(private readonly decrypter: IDecrypter) {}

  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const accessToken = httpRequest.headers?.['x-access-token'];

      if (accessToken) {
        const decoded = this.decrypter.decrypt(accessToken);

        if (decoded) {
          const { sub } = decoded;
          return success({ user: sub });
        }
      }
      return unauthorized();
    } catch {
      return unauthorized();
    }
  }
}
