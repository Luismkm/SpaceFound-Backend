import { DbAuthentication } from '@/data/usecases/account/authentication/DbAuthentication';

import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import { IHashComparer } from '@/data/protocols/cryptography/IHashComparer';
import { IEncrypter } from '@/data/protocols/cryptography/IEncrypter';

import { mockAuthenticationDTO, throwError } from '@/tests/domain/mocks';
import { mockEncrypter, mockHashComparer, mockLoadAccountByEmailRepository } from '../mocks';

type ISutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
  hashComparerStub: IHashComparer
  encrypterStub: IEncrypter
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  const hashComparerStub = mockHashComparer();
  const encrypterStub = mockEncrypter();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
  );

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
  };
};

describe('DbAuthentication UseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.auth(mockAuthenticationDTO());
    expect(loadSpy).toHaveBeenCalledWith('any_email');
  });

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationDTO());
    await expect(promise).rejects.toThrow();
  });

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockReturnValueOnce(null);
    const account = await sut.auth(mockAuthenticationDTO());
    expect(account).toBeNull();
  });

  it('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut();
    const compareSpy = jest.spyOn(hashComparerStub, 'compare');
    await sut.auth(mockAuthenticationDTO());
    expect(compareSpy).toHaveBeenCalledWith('any_password', 'any_password');
  });

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationDTO());
    await expect(promise).rejects.toThrow();
  });

  it('should return null if HashComparer return false', async () => {
    const { sut, hashComparerStub } = makeSut();
    jest.spyOn(hashComparerStub, 'compare').mockReturnValueOnce(Promise.resolve(false));
    const account = await sut.auth(mockAuthenticationDTO());
    expect(account).toBeNull();
  });

  it('should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.auth(mockAuthenticationDTO());
    expect(encryptSpy).toHaveBeenLastCalledWith('any_uuid');
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationDTO());
    await expect(promise).rejects.toThrow();
  });

  it('should return an accessToken on success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(mockAuthenticationDTO());
    expect(accessToken).toBeTruthy();
    expect(accessToken).toBe('any_token');
  });
});
