import { IHasher } from '@/data/protocols/cryptography/IHasher';
import { IHashComparer } from '@/data/protocols/cryptography/IHashComparer';

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
