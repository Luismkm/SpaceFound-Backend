import MockDate from 'mockdate';
import { DbCreateUserAccount } from '@/data/usecases/user/DbCreateUserAccount';

import { CreateAccountRepositorySpy, CheckAccountByEmailRepositorySpy, HasherSpy, UuidGeneratorSpy } from '@/tests/data/mocks';
import { mockCreateAccountParams, throwError } from '@/tests/domain/mocks';
import { SendEmailServiceSpy } from '../mocks/mockSendEmailService';

type ISutTypes = {
  sut: DbCreateUserAccount
  hasherSpy: HasherSpy
  uuidSpy: UuidGeneratorSpy
  sendEmailServiseSpy: SendEmailServiceSpy
  createAccountRepositorySpy: CreateAccountRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): ISutTypes => {
  const createAccountRepositorySpy = new CreateAccountRepositorySpy();
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy();
  const sendEmailServiseSpy = new SendEmailServiceSpy();
  const hasherSpy = new HasherSpy();
  const uuidSpy = new UuidGeneratorSpy();
  const sut = new DbCreateUserAccount(
    hasherSpy,
    uuidSpy,
    sendEmailServiseSpy,
    createAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
  );
  return {
    sut,
    hasherSpy,
    uuidSpy,
    sendEmailServiseSpy,
    createAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
  };
};

describe('DbCreateUserAccount Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

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
    const { sut, hasherSpy, uuidSpy, createAccountRepositorySpy } = makeSut();
    const params = mockCreateAccountParams();
    await sut.create(params);
    expect(createAccountRepositorySpy.params).toEqual({
      id: uuidSpy.digest,
      name: params.name,
      email: params.email,
      password: hasherSpy.digest,
      cityId: params.cityId,
      createdAt: params.createdAt,
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

  it('should call sendEmailService with correct values on created user', async () => {
    const { sut, sendEmailServiseSpy } = makeSut();
    const request = mockCreateAccountParams();
    await sut.create(request);
    expect(sendEmailServiseSpy.params).toEqual({
      to: {
        name: request.name,
        email: request.email,
      },
    });
  });

  it('should not call sendEmailService when user not created', async () => {
    const { sut, createAccountRepositorySpy, sendEmailServiseSpy } = makeSut();
    const request = mockCreateAccountParams();
    jest
      .spyOn(createAccountRepositorySpy, 'create')
      .mockReturnValueOnce(Promise.resolve(false))
    const sendSpy = jest.spyOn(sendEmailServiseSpy, 'send')
    await sut.create(request);
    expect(sendSpy).not.toHaveBeenCalledWith();
  });

  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const account = await sut.create(mockCreateAccountParams());
    expect(account).toBe(true);
  });
});
