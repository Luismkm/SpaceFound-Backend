import MockDate from 'mockdate';

import { UuidGeneratorSpy } from '@/tests/data/mocks/mockUuidGenerator';
import { CheckProviderByCnpjRepositorySpy, CheckProviderByEmailRepositorySpy, CreateProviderRepositorySpy } from '@/tests/data/mocks/mockDbProvider';
import { mockCreateProviderParams } from '@/tests/domain/mocks/mockProvider';
import { DbCreateProviderAccount } from '@/data/usecases/provider/DbCreateProviderAccount';
import { CnpjAlreadyRegisteredError, EmailInUseError } from '@/presentation/errors';

type ISutTypes = {
  sut: DbCreateProviderAccount
  uuidSpy: UuidGeneratorSpy
  createProviderRepositorySpy: CreateProviderRepositorySpy
  checkProviderByEmailRepositorySpy: CheckProviderByEmailRepositorySpy
  checkProviderByCnpjRepositorySpy: CheckProviderByCnpjRepositorySpy
}

const makeSut = (): ISutTypes => {
  const uuidSpy = new UuidGeneratorSpy();
  const createProviderRepositorySpy = new CreateProviderRepositorySpy();
  const checkProviderByEmailRepositorySpy = new CheckProviderByEmailRepositorySpy();
  const checkProviderByCnpjRepositorySpy = new CheckProviderByCnpjRepositorySpy();
  const sut = new DbCreateProviderAccount(
    uuidSpy,
    checkProviderByEmailRepositorySpy,
    checkProviderByCnpjRepositorySpy,
    createProviderRepositorySpy,
  );
  return {
    sut,
    uuidSpy,
    checkProviderByEmailRepositorySpy,
    checkProviderByCnpjRepositorySpy,
    createProviderRepositorySpy,
  };
};

describe('DbCreateProvider Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });
  it('should call uuidGenerator', async () => {
    const { sut, uuidSpy } = makeSut();
    const generateUuid = jest.spyOn(uuidSpy, 'uuidGenerator');
    await sut.create(mockCreateProviderParams());
    expect(generateUuid).toBeCalled();
  });

  it('should return an instance of EmailInUseError if CheckProviderByEmailRepository return an Provider', async () => {
    const { sut, checkProviderByEmailRepositorySpy } = makeSut();
    jest.spyOn(checkProviderByEmailRepositorySpy, 'checkProviderByEmail')
      .mockResolvedValueOnce(Promise.resolve(true));
    const params = mockCreateProviderParams();
    const provider = await sut.create(params);
    expect(provider).toBeInstanceOf(EmailInUseError)
  });

  it('should return an instance of CnpjAlreadyRegisteredError if CheckProviderByCnpjRepository return an Provider', async () => {
    const { sut, checkProviderByCnpjRepositorySpy } = makeSut();
    jest.spyOn(checkProviderByCnpjRepositorySpy, 'checkProviderByCnpj')
      .mockResolvedValueOnce(Promise.resolve(true));
    const params = mockCreateProviderParams();
    const provider = await sut.create(params);
    expect(provider).toBeInstanceOf(CnpjAlreadyRegisteredError)
  });

  it('should call CreateProviderRepository with correct values', async () => {
    const { sut, uuidSpy, createProviderRepositorySpy } = makeSut();
    const params = mockCreateProviderParams();
    await sut.create(params);
    expect(createProviderRepositorySpy.params).toEqual({
      id: uuidSpy.digest,
      cnpj: params.cnpj,
      description: params.description,
      email: params.email,
      name: params.name,
      createdAt: params.createdAt,
      serviceId: params.serviceId,
    });
  });

  it('should return true on ok', async () => {
    const { sut } = makeSut();
    const provider = await sut.create(mockCreateProviderParams());
    expect(provider).toBe(true);
  });
});
