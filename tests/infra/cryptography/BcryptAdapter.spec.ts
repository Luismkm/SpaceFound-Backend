import bcrypt from 'bcrypt';

import { BcryptAdapter } from '@/infra/cryptography/bcryptAdapter/BcryptAdapter';
import { throwError } from '@/tests/domain/mocks';

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return Promise.resolve('hash');
  },
}));

const salt = 12;
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    it('should call hash with correct value', async () => {
      const sut = makeSut();
      const hashSpy = jest.spyOn(bcrypt, 'hash');
      await sut.hash('any_value');
      expect(hashSpy).toHaveBeenCalledWith('any_value', 12);
    });

    it('should return a valid hash on hash success', async () => {
      const sut = makeSut();
      const hash = await sut.hash('any_value');
      expect(hash).toBe('hash');
    });

    it('should throw if bcrypt hash throws', async () => {
      const sut = makeSut();
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError);
      const promise = sut.hash('any_value');
      await expect(promise).rejects.toThrow();
    });
  });
});
