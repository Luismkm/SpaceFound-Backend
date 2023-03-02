import { DbLoadProviders } from '@/data/usecases/provider/DbLoadProviders';

import { ILoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';

import { mockLoadProvidersRepository } from '../mocks/mockDbProvider';
import { mockProviders } from '@/tests/domain/mocks/mockProvider';
import { throwError } from '@/tests/domain/mocks';

type ISutTypes = {
  sut: DbLoadProviders
  loadProvidersRepositoryStub: ILoadProvidersRepository
}

const makeSut = (): ISutTypes => {
  const loadProvidersRepositoryStub = mockLoadProvidersRepository();
  const sut = new DbLoadProviders(loadProvidersRepositoryStub);
  return {
    sut,
    loadProvidersRepositoryStub,
  };
};

describe('DbLoadProviders ', () => {
  it('should call LoadProvidersRepository', async () => {
    const { sut, loadProvidersRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadProvidersRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should return a list of Providers on ok', async () => {
    const { sut } = makeSut();
    const providers = await sut.load();
    expect(providers).toEqual(mockProviders());
  });

  it('should throw if LoadProvidersRepository throws', async () => {
    const { sut, loadProvidersRepositoryStub } = makeSut();
    jest.spyOn(loadProvidersRepositoryStub, 'loadAll').mockImplementationOnce(throwError);
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
