import { DbCreateAccount } from '@/data/usecases/account/createAccount/DbCreateAccount';

import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';

import { mockCreateAccountRepository } from '@/tests/data/mocks';
import { mockAccount, mockAccountDTO, throwError } from '@/tests/domain/mocks';

type ISutTypes = {
  sut: DbCreateAccount
  createAccountRepositoryStub: ICreateAccountRepository
}

const makeSut = (): ISutTypes => {
  const createAccountRepositoryStub = mockCreateAccountRepository();
  const sut = new DbCreateAccount(createAccountRepositoryStub);
  return {
    sut,
    createAccountRepositoryStub,
  };
};

describe('DbCreateAccount Usecase', () => {
  it('Should call CreateAccountRepository with correct values', async () => {
    const { sut, createAccountRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create');
    await sut.create(mockAccountDTO());
    expect(createSpy).toHaveBeenCalledWith(mockAccountDTO());
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
