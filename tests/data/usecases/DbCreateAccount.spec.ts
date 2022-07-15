import { DbCreateAccount } from '@/data/usecases/account/DbCreateAccount';

import { CreateAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy, UuidGeneratorStub } from '@/tests/data/mocks';
import { mockCreateAccountParams, throwError } from '@/tests/domain/mocks';

type ISutTypes = {
  sut: DbCreateAccount
  hasherSpy: HasherSpy
  uuidStub: UuidGeneratorStub
  createAccountRepositorySpy: CreateAccountRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): ISutTypes => {
  const createAccountRepositorySpy = new CreateAccountRepositorySpy();
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy();
  const hasherSpy = new HasherSpy();
  const uuidStub = new UuidGeneratorStub();
  const sut = new DbCreateAccount(
    hasherSpy,
    uuidStub,
    createAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
  );
  return {
    sut,
    hasherSpy,
    uuidStub,
    createAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
  };
};

describe('DbCreateAccount Usecase', () => {
  it('should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut();
    const request = mockCreateAccountParams();
    await sut.create(request);
    expect(hasherSpy.plaintext).toBe(request.password);
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut();
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateAccountParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should call CreateAccountRepository with correct values', async () => {
    const { sut, hasherSpy, uuidStub, createAccountRepositorySpy } = makeSut();
    const createAccountParams = mockCreateAccountParams();
    await sut.create(createAccountParams);
    expect(createAccountRepositorySpy.params).toEqual({
      id: uuidStub.digest,
      name: createAccountParams.name,
      email: createAccountParams.email,
      password: hasherSpy.digest,
      avatar: createAccountParams.avatar,
    });
  });

  it('Should throw if CreateAccountRepository throws ', async () => {
    const { sut, createAccountRepositorySpy } = makeSut();
    jest
      .spyOn(createAccountRepositorySpy, 'create')
      .mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateAccountParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const account = await sut.create(mockCreateAccountParams());
    expect(account).toBe(true);
  });

  it('should return false if CheckAccountByEmailRepository return true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
      .mockResolvedValueOnce(Promise.resolve(true));
    const account = await sut.create(mockCreateAccountParams());
    expect(account).toBe(false);
  });

  it('should call CheckAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    const request = mockCreateAccountParams();
    await sut.create(request);
    expect(checkAccountByEmailRepositorySpy.params).toBe(request.email);
  });
});
