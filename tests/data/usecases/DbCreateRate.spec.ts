import DbCreateRate from '@/data/usecases/rate/DbCreateRate';

import { mockRateParams } from '@/tests/domain/mocks/mockRate';
import { throwError } from '@/tests/domain/mocks';
import { CreateRateRepositorySpy } from '@/tests/data/mocks/mockDbRate';
import { UuidGeneratorSpy } from '@/tests/data/mocks';
import { CheckProviderByIdRepositorySpy } from '../mocks/mockDbProvider';

type ISutTypes = {
  sut: DbCreateRate
  uuidSpy: UuidGeneratorSpy
  createRateRepositorySpy: CreateRateRepositorySpy
  checkProviderByIdRepositorySpy: CheckProviderByIdRepositorySpy
}

const makeSut = ():ISutTypes => {
  const uuidSpy = new UuidGeneratorSpy();
  const createRateRepositorySpy = new CreateRateRepositorySpy();
  const checkProviderByIdRepositorySpy = new CheckProviderByIdRepositorySpy()
  const sut = new DbCreateRate(uuidSpy, checkProviderByIdRepositorySpy, createRateRepositorySpy);
  return {
    sut,
    uuidSpy,
    createRateRepositorySpy,
    checkProviderByIdRepositorySpy,
  };
};

describe('Db Create Rate', () => {
  it('should call uuidGenerator', async () => {
    const { sut, uuidSpy } = makeSut();
    const generateUuid = jest.spyOn(uuidSpy, 'uuidGenerator');
    await sut.create(mockRateParams());
    expect(generateUuid).toBeCalled();
  });

  it('should call checkProfileById', async () => {
    const { sut, checkProviderByIdRepositorySpy } = makeSut();
    const checkProfileById = jest.spyOn(checkProviderByIdRepositorySpy, 'checkProfileById');
    await sut.create(mockRateParams());
    expect(checkProfileById).toBeCalled();
  });

  it('should call checkProfileById with correct values', async () => {
    const { sut, checkProviderByIdRepositorySpy } = makeSut();
    const params = mockRateParams()
    await sut.create(params);
    expect(checkProviderByIdRepositorySpy.id).toBe(params.accountId)
  });

  it('should return false if checkProfileById returns false', async () => {
    const { sut, checkProviderByIdRepositorySpy } = makeSut();
    jest.spyOn(checkProviderByIdRepositorySpy, 'checkProfileById').mockImplementationOnce(() => Promise.resolve(false));
    const rate = await sut.create(mockRateParams());
    expect(rate).toBeFalsy()
  });

  it('Should throw if CreateRateRepository throws ', async () => {
    const { sut, createRateRepositorySpy } = makeSut();
    jest.spyOn(createRateRepositorySpy, 'create').mockImplementationOnce(throwError);
    const promise = sut.create(mockRateParams());
    await expect(promise).rejects.toThrow();
  });

  it('should call CreateRateRepository with correct values', async () => {
    const { sut, uuidSpy, createRateRepositorySpy } = makeSut();
    const params = mockRateParams();
    await sut.create(params);
    expect(createRateRepositorySpy.params).toEqual({
      id: uuidSpy.digest,
      star: params.star,
      comment: params.comment,
      accountId: params.accountId,
      providerId: params.providerId,
      createdAt: params.createdAt,
    });
  });

  it('Should return true in created rate', async () => {
    const { sut } = makeSut();
    const rate = await sut.create(mockRateParams());
    expect(rate).toBe(true);
  });
});
