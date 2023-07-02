import MockDate from 'mockdate';

import { DbCreateUserByGoogleProvider } from '@/data/usecases/login/DbCreateUserByGoogleProvider';
import { UuidGeneratorSpy } from '@/tests/data/mocks/mockUuidGenerator';
import { SendEmailServiceSpy } from '@/tests/data/mocks/mockSendEmailService';
import { CheckAccountByEmailRepositorySpy } from '@/tests/data/mocks/mockDbUserAccount';
import { CreateGoogleAccountRepositorySpy } from '@/tests/data/mocks/mockDbGoogleAccount';
import { mockCreateGoogleAccountParams } from '@/tests/domain/mocks/mockGoogleUser';

type ISutTypes = {
  sut: DbCreateUserByGoogleProvider
  uuidSpy: UuidGeneratorSpy
  sendEmailServiseSpy: SendEmailServiceSpy
  createGoogleAccountRepositorySpy: CreateGoogleAccountRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

const makeSut = (): ISutTypes => {
  const uuidSpy = new UuidGeneratorSpy();
  const sendEmailServiseSpy = new SendEmailServiceSpy();
  const createGoogleAccountRepositorySpy = new CreateGoogleAccountRepositorySpy();
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy();

  const sut = new DbCreateUserByGoogleProvider(
    uuidSpy,
    sendEmailServiseSpy,
    createGoogleAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
  )

  return {
    sut,
    uuidSpy,
    sendEmailServiseSpy,
    createGoogleAccountRepositorySpy,
    checkAccountByEmailRepositorySpy,
  }
}

describe('DbCreateUserByGoogleProvider Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('should call CheckAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    const request = mockCreateGoogleAccountParams();
    await sut.create(request);
    expect(checkAccountByEmailRepositorySpy.params).toBe(request.email);
  });

  it('should return false if CheckAccountByEmailRepository return true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
      .mockResolvedValueOnce(Promise.resolve(true));
    const account = await sut.create(mockCreateGoogleAccountParams());
    expect(account).toBe(false);
  });

  it('Should call CreateAccountRepository with correct values', async () => {
    const { sut, uuidSpy, createGoogleAccountRepositorySpy } = makeSut();
    const params = mockCreateGoogleAccountParams();
    await sut.create(params);
    expect(createGoogleAccountRepositorySpy.params).toEqual({
      id: uuidSpy.digest,
      name: params.name,
      email: params.email,
      avatar: params.avatar,
      createdAt: params.createdAt,
    });
  });

  it('Should return false if CreateAccountRepository not created correctly', async () => {
    const { sut, createGoogleAccountRepositorySpy } = makeSut();
    const params = mockCreateGoogleAccountParams();
    jest.spyOn(createGoogleAccountRepositorySpy, 'create')
      .mockResolvedValueOnce(Promise.resolve(false))
    const account = await sut.create(params);
    expect(account).toBe(false)
  });

  it('should call sendEmailService with correct values on created user', async () => {
    const { sut, sendEmailServiseSpy } = makeSut();
    const request = mockCreateGoogleAccountParams();
    await sut.create(request);
    expect(sendEmailServiseSpy.params).toEqual({
      to: {
        name: request.name,
        email: request.email,
      },
    });
  });

  it('should not call sendEmailService when user not created', async () => {
    const { sut, createGoogleAccountRepositorySpy, sendEmailServiseSpy } = makeSut();
    const request = mockCreateGoogleAccountParams();
    jest
      .spyOn(createGoogleAccountRepositorySpy, 'create')
      .mockReturnValueOnce(Promise.resolve(false))
    const sendSpy = jest.spyOn(sendEmailServiseSpy, 'send')
    await sut.create(request);
    expect(sendSpy).not.toHaveBeenCalledWith();
  });

  it('Should return true on ok', async () => {
    const { sut } = makeSut();
    const account = await sut.create(mockCreateGoogleAccountParams());
    expect(account).toBe(true);
  });
})
