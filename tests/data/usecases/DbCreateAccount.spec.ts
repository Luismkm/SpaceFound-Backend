import { DbCreateAccount } from '@/data/usecases/account/createAccount/DbCreateAccount';

import { ICreateAccountRepository } from '@/data/protocols/db/account/ICreateAccountRepository';

import { mockCreateAccountRepository } from '@/tests/data/mocks';
import { mockAccountDTO } from '@/tests/domain/mocks';

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
});
