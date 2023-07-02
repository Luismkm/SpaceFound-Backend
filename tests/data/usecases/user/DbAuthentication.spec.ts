import { DbAuthentication } from '@/data/usecases/user/DbAuthentication';

import { mockAuthenticationParams, throwError } from '@/tests/domain/mocks';
import { LoadAccountByEmailRepositorySpy } from '@/tests/data/mocks/mockDbUserAccount';
import { EncrypterSpy, HashComparerSpy } from '@/tests/data/mocks/mockCryptography';

type ISutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy();
  const hashComparerSpy = new HashComparerSpy();
  const encrypterSpy = new EncrypterSpy();
  const sut = new DbAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
  );

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
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
    const { sut, encrypterSpy } = makeSut();
    await sut.auth(mockAuthenticationParams());
    expect(encrypterSpy.params).toEqual({
      sub: 'any_uuid',
      accountType: 'user',
    });
  });

  it('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut();
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError);
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow();
  });

  it('should return an accessToken on success', async () => {
    const { sut, encrypterSpy } = makeSut();
    const accessToken = await sut.auth(mockAuthenticationParams());
    expect(accessToken).toBe(encrypterSpy.textEncrypted)
  });
});
