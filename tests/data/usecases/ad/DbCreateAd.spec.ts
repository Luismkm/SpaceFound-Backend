import { DbCreateAd } from '@/data/usecases/ad/DbCreateAd';
import { UuidGeneratorSpy } from '@/tests/data/mocks';
import { CreateAdRepositorySpy } from '@/tests/data/mocks/mockDbAd';
import { mockCreateAdParams } from '@/tests/domain/mocks/mockAd';

type ISutTypes = {
  sut: DbCreateAd
  uuidSpy: UuidGeneratorSpy
  createAdRepositorySpy: CreateAdRepositorySpy
}

const makeSut = (): ISutTypes => {
  const uuidSpy = new UuidGeneratorSpy();
  const createAdRepositorySpy = new CreateAdRepositorySpy();
  const sut = new DbCreateAd(uuidSpy, createAdRepositorySpy);
  return {
    sut,
    uuidSpy,
    createAdRepositorySpy,
  };
};

describe('DbAd Usecase', () => {
  it('Should call CreateAdRepository with correct params', async () => {
    const { sut, uuidSpy, createAdRepositorySpy } = makeSut();
    const params = mockCreateAdParams();
    await sut.create(params);
    expect(createAdRepositorySpy.params).toEqual({
      id: uuidSpy.digest,
      accountId: params.accountId,
      title: params.title,
      serviceId: params.serviceId,
      description: params.description,
      createdAt: params.createdAt,
    });
  });

  it('Should return true if CreateAdRepository created on success', async () => {
    const { sut, createAdRepositorySpy } = makeSut();
    const params = mockCreateAdParams();
    await sut.create(params);
    expect(createAdRepositorySpy.result).toBe(true);
  });
});
