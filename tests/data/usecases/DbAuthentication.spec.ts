import { DbAuthentication } from '@/data/usecases/account/authentication/DbAuthentication';
import { IEncrypter } from '@/data/protocols/cryptography/IEncrypter';

import { HashComparerSpy, LoadAccountByEmailRepositorySpy, mockEncrypter } from '@/tests/data/mocks';
import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks';

type ISutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterStub: IEncrypter
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterStub = mockEncrypter();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterStub,
  );

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterStub,
  };
};

describe('DbAuthentication UseCase', () => {
  it('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email);
  });

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut();
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut();
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(null);
    const account = await sut.auth(mockAuthenticationParams());
    expect(account).toBeNull();
  });

  it('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(hashComparerSpy.plaintext).toBe(authenticationParams.password);
  });

  it('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut();
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('should return null if HashComparer return false', async () => {
    const { sut, hashComparerSpy } = makeSut();
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.resolve(false));
    const account = await sut.auth(mockAuthenticationParams());
    expect(account).toBeNull();
  });

  it('should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut();
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    await sut.auth(mockAuthenticationParams());
    expect(encryptSpy).toHaveBeenLastCalledWith('any_uuid');
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut();
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('should return an accessToken on success', async () => {
    const { sut } = makeSut();
    const accessToken = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBeTruthy();
    expect(accessToken).toBe('any_token');
  });
});
