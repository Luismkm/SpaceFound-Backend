import {
  IDecrypter, IEncrypter, IHashComparer, IHasher,
} from '@/data/protocols/cryptography';
import { ITokenPayload } from '@/data/protocols/helpers/ITokenPayload';

export class HasherSpy implements IHasher {
  digest = 'hashed_password'
  plaintext: string

  async hash(plaintext: string): Promise<string> {
    this.plaintext = plaintext;
    return this.digest;
  }
}

export class HashComparerSpy implements IHashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare(plaintext: string, digest: string): Promise<boolean> {
    this.plaintext = plaintext;
    this.digest = digest;
    return this.isValid;
  }
}

export const mockEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    encrypt(value: string): string {
      return 'any_token';
    }
  }
  return new EncrypterStub();
};

export const mockDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    decrypt(value: string): ITokenPayload {
      return {
        iat: 123456,
        sub: 'any_value',
      };
    }
  }
  return new DecrypterStub();
};
