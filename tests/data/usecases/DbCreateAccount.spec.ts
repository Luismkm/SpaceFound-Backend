import { DbCreateAccount } from '@/data/usecases/account/createAccount/DbCreateAccount';

import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';

import { mockCreateAccountRepository, mockHasher, mockLoadAccountByEmailRepository } from '@/tests/data/mocks';
import { mockAccount, mockAccountDTO, throwError } from '@/tests/domain/mocks';
import { IHasher } from '@/data/protocols/cryptography/IHasher';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';

type ISutTypes = {
  sut: DbCreateAccount
  hasherStub: IHasher
  createAccountRepositoryStub: ICreateAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): ISutTypes => {
  const createAccountRepositoryStub = mockCreateAccountRepository();
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository();
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    .mockReturnValue(Promise.resolve(null));
  const hasherStub = mockHasher();
  const sut = new DbCreateAccount(
    hasherStub,
    createAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  );
  return {
    sut,
    hasherStub,
    createAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbCreateAccount Usecase', () => {
  it('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    await sut.create(mockAccountDTO());
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(throwError);
    const promise = sut.create(mockAccountDTO());
    await expect(promise).rejects.toThrow();
  });

  it('Should call CreateAccountRepository with correct values', async () => {
    const { sut, createAccountRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create');
    await sut.create(mockAccountDTO());
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password',
    });
  });

  it('Should throw if CreateAccountRepository throws ', async () => {
    const { sut, createAccountRepositoryStub } = makeSut();
    jest
      .spyOn(createAccountRepositoryStub, 'create')
      .mockImplementationOnce(throwError);
    const promise = sut.create(mockAccountDTO());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.create(mockAccountDTO());
    expect(account).toEqual(mockAccount());
  });

  it('should return null if LoadAccountByEmailRepository not return null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(Promise.resolve(mockAccount()));
    const account = await sut.create(mockAccountDTO());
    expect(account).toBeNull();
  });

  it('should call LoadAccountByEmailRepository with correct value', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByEmailSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.create(mockAccountDTO());
    expect(loadByEmailSpy).toHaveBeenLastCalledWith('any_email');
  });
});
