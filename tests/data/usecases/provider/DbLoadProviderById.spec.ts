import { mockProviderProfile } from '@/tests/domain/mocks/mockProvider';
import { throwError } from '@/tests/domain/mocks';
import { DbLoadProfileById } from '@/data/usecases/provider/DbLoadProfileById';
import { LoadProfileByIdRepositorySpy } from '@/tests/data/mocks/mockDbProvider';

type ISutTypes = {
  sut: DbLoadProfileById
  loadProviderByIdRepositorySpy: LoadProfileByIdRepositorySpy
}

const makeSut = (): ISutTypes => {
  const loadProviderByIdRepositorySpy = new LoadProfileByIdRepositorySpy();
  const sut = new DbLoadProfileById(loadProviderByIdRepositorySpy);
  return {
    sut,
    loadProviderByIdRepositorySpy,
  };
};

describe('DbLoadProfileById ', () => {
  it('should call LoadProviderByIdRepository', async () => {
    const { sut, loadProviderByIdRepositorySpy } = makeSut();
    const loadSpy = jest.spyOn(loadProviderByIdRepositorySpy, 'loadProfileById');
    await sut.load('any_uuid');
    expect(loadSpy).toHaveBeenCalled();
  });

  it('should return a list of Providers on ok', async () => {
    const { sut } = makeSut();
    const provider = await sut.load('any_uuid');
    expect(provider).toEqual(mockProviderProfile());
  });

  it('should throw if LoadProviderByIdRepository throws', async () => {
    const { sut, loadProviderByIdRepositorySpy } = makeSut();
    jest.spyOn(loadProviderByIdRepositorySpy, 'loadProfileById').mockImplementationOnce(throwError);
    const promise = sut.load('any_uuid');
    await expect(promise).rejects.toThrow();
  });
});
