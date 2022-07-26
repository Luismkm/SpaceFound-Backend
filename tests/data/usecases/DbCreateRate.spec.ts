import DbCreateRate from '@/data/usecases/rate/DbCreateRate';

import { mockRateParams } from '@/tests/domain/mocks/mockRate';
import { throwError } from '@/tests/domain/mocks';
import { CreateRateRepositorySpy } from '@/tests/data/mocks/mockDbRate';
import { UuidGeneratorSpy } from '@/tests/data/mocks';

type ISutTypes = {
  sut: DbCreateRate
  uuidSpy: UuidGeneratorSpy
  createRateRepositorySpy: CreateRateRepositorySpy
}

const makeSut = ():ISutTypes => {
  const uuidSpy = new UuidGeneratorSpy();
  const createRateRepositorySpy = new CreateRateRepositorySpy();
  const sut = new DbCreateRate(uuidSpy, createRateRepositorySpy);
  return {
    sut,
    uuidSpy,
    createRateRepositorySpy,
  };
};

describe('Db Create Rate', () => {
  it('should call CreateRateRepository with correct values', async () => {
    const { sut, uuidSpy, createRateRepositorySpy } = makeSut();
    const params = mockRateParams();
    await sut.create(params);
    expect(createRateRepositorySpy.params).toEqual({
      id: uuidSpy.digest,
      star: params.star,
      comment: params.comment,
      userId: params.userId,
      providerId: params.providerId,
      createdAt: params.createdAt,
    });
  });

  it('Should throw if CreateRateRepository throws ', async () => {
    const { sut, createRateRepositorySpy } = makeSut();
    jest.spyOn(createRateRepositorySpy, 'create').mockImplementationOnce(throwError);
    const promise = sut.create(mockRateParams());
    await expect(promise).rejects.toThrow();
  });

  it('Should return true on success', async () => {
    const { sut } = makeSut();
    const rate = await sut.create(mockRateParams());
    expect(rate).toBe(true);
  });
});
