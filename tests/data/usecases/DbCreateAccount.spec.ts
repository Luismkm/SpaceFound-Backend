import { DbCreateAccount } from '@/data/usecases/account/createAccount/DbCreateAccount';

import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';

import { mockCreateAccountRepository, mockHasher } from '@/tests/data/mocks';
import { mockAccount, mockAccountDTO, throwError } from '@/tests/domain/mocks';
import { IHasher } from '@/data/protocols/cryptography/IHasher';

type ISutTypes = {
  sut: DbCreateAccount
  hasherStub: IHasher
  createAccountRepositoryStub: ICreateAccountRepository
}

const makeSut = (): ISutTypes => {
  const createAccountRepositoryStub = mockCreateAccountRepository();
  const hasherStub = mockHasher();
  const sut = new DbCreateAccount(hasherStub, createAccountRepositoryStub);
  return {
    sut,
    hasherStub,
    createAccountRepositoryStub,
  };
};

describe('DbCreateAccount Usecase', () => {
  it('should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    await sut.create(mockAccountDTO());
    expect(hashSpy).toHaveBeenCalledWith('any_password');
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
});
