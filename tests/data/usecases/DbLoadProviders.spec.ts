import { DbLoadAllProviders } from '@/data/usecases/provider/DbLoadAllProviders';

import { throwError } from '@/tests/domain/mocks';
import { LoadAllProvidersRepositorySpy } from '@/tests/data/mocks/mockDbProvider';

type ISutTypes = {
  sut: DbLoadAllProviders
  loadAllProvidersRepositorySpy: LoadAllProvidersRepositorySpy
}

const makeSut = (): ISutTypes => {
  const loadAllProvidersRepositorySpy = new LoadAllProvidersRepositorySpy();
  const sut = new DbLoadAllProviders(loadAllProvidersRepositorySpy);
  return {
    sut,
    loadAllProvidersRepositorySpy,
  };
};

describe('DbLoadAllProviders ', () => {
  it('should call LoadProvidersRepository', async () => {
    const { sut, loadAllProvidersRepositorySpy } = makeSut();
    const loadSpy = jest.spyOn(loadAllProvidersRepositorySpy, 'loadAll');
    await sut.loadAll()
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should return a list of All Providers on ok', async () => {
    const { sut, loadAllProvidersRepositorySpy } = makeSut();
    const providers = await sut.loadAll();
    expect(providers).toEqual(loadAllProvidersRepositorySpy.result);
  });

  it('should throw if LoadProvidersRepository throws', async () => {
    const { sut, loadAllProvidersRepositorySpy } = makeSut();
    jest.spyOn(loadAllProvidersRepositorySpy, 'loadAll').mockImplementationOnce(throwError);
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow();
  });
});
