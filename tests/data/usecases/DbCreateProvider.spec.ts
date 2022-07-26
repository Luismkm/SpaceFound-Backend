import MockDate from 'mockdate';

import DbCreateProvider from '@/data/usecases/provider/DbCreateProvider';

import { UuidGeneratorSpy } from '@/tests/data/mocks';
import { CreateProviderRepositorySpy } from '@/tests/data/mocks/mockDbProvider';
import { mockCreateProviderParams } from '@/tests/domain/mocks/mockProvider';

type ISutTypes = {
  sut: DbCreateProvider
  uuidSpy: UuidGeneratorSpy
  createProviderRepositorySpy: CreateProviderRepositorySpy
}

const makeSut = (): ISutTypes => {
  const uuidSpy = new UuidGeneratorSpy();
  const createProviderRepositorySpy = new CreateProviderRepositorySpy();
  const sut = new DbCreateProvider(uuidSpy, createProviderRepositorySpy);
  return {
    sut,
    uuidSpy,
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

  it('should call CreateProviderRepository with correct values', async () => {
    const { sut, uuidSpy, createProviderRepositorySpy } = makeSut();
    const params = mockCreateProviderParams();
    await sut.create(params);
    expect(createProviderRepositorySpy.params).toEqual({
      id: uuidSpy.digest,
      cnpj: params.cnpj,
      description: params.description,
      name: params.name,
      createdAt: params.createdAt,
      serviceId: params.serviceId,
      userId: params.userId,
    });
  });

  it('should return true on success', async () => {
    const { sut } = makeSut();
    const provider = await sut.create(mockCreateProviderParams());
    expect(provider).toBe(true);
  });
});
