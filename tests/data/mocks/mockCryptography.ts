import { IHasher } from '@/data/protocols/cryptography/IHasher';

export const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash(value: string): Promise<string> {
      return Promise.resolve('hashed_password');
    }
  }
  return new HasherStub();
};
