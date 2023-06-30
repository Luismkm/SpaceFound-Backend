import {
  encrypterParams,
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

export class EncrypterSpy implements IEncrypter {
  params: encrypterParams
  textEncrypted = 'any_encrypt'

  encrypt({ sub, accountType }:encrypterParams): string {
    this.params = { sub, accountType }
    return this.textEncrypted
  }
}

export class DecrypterSpy implements IDecrypter {
  token: string
  plainText = {
    iat: 123456,
    sub: 'any_value',
    accountType: 'any_account',
  };

  decrypt(token: string): ITokenPayload {
    this.token = token
    return this.plainText
  }
}
