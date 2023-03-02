import { DbLoadProviderById } from '@/data/usecases/provider/DbLoadProviderById';

import { ILoadProviderByIdRepository } from '@/data/protocols/db/provider/ILoadProviderByIdRepository';

import { mockLoadProviderByIdRepository } from '../mocks/mockDbProvider';
import { mockProviderProfile } from '@/tests/domain/mocks/mockProvider';
import { throwError } from '@/tests/domain/mocks';

type ISutTypes = {
  sut: DbLoadProviderById
  loadProviderByIdRepositoryStub: ILoadProviderByIdRepository
}

const makeSut = (): ISutTypes => {
  const loadProviderByIdRepositoryStub = mockLoadProviderByIdRepository();
  const sut = new DbLoadProviderById(loadProviderByIdRepositoryStub);
  return {
    sut,
    loadProviderByIdRepositoryStub,
  };
};

describe('DbLoadProviderById ', () => {
  it('should call LoadProviderByIdRepository', async () => {
    const { sut, loadProviderByIdRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadProviderByIdRepositoryStub, 'loadById');
    await sut.loadById('any_uuid');
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should return a list of Providers on ok', async () => {
    const { sut } = makeSut();
    const provider = await sut.loadById('any_uuid');
    expect(provider).toEqual(mockProviderProfile());
  });

  it('should throw if LoadProviderByIdRepository throws', async () => {
    const { sut, loadProviderByIdRepositoryStub } = makeSut();
    jest.spyOn(loadProviderByIdRepositoryStub, 'loadById').mockImplementationOnce(throwError);
    const promise = sut.loadById('any_uuid');
    await expect(promise).rejects.toThrow();
  });
});
