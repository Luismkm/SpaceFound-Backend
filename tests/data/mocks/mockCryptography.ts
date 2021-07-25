import {
  IDecrypter, IEncrypter, IHashComparer, IHasher, ITokenPayload,
} from '@/data/protocols/cryptography';

export const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};

export const mockHashComparer = (): IHashComparer => {
  class HashCompareStub implements IHashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  return new HashCompareStub();
};

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
