import jwt, { sign } from 'jsonwebtoken';

import { IEncrypter } from '@/data/protocols/cryptography/IEncrypter';
import { IDecrypter } from '@/data/protocols/cryptography/IDecrypter';
import { ITokenPayload } from '@/data/protocols/helpers/ITokenPayload';

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  encrypt(value: string): string {
    const token = sign({}, this.secret, {
      subject: value,
    });
    return token;
  }

  decrypt(token: string): ITokenPayload {
    const value: any = jwt.verify(token, this.secret);
    return value;
  }
}
