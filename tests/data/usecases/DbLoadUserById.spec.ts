import { DbLoadUserById } from '@/data/usecases/user/loadUserById/DbLoadUserById';
import { ILoadUserByIdRepository } from '@/data/protocols/db/user/ILoadUserByIdRepository';
import { mockAccount, throwError } from '@/tests/domain/mocks';
import { mockLoadUserByIdRepository } from '../mocks/mockDbUser';

type ISutTypes = {
  sut: DbLoadUserById
  loadUserByIdRepositoryStub: ILoadUserByIdRepository
}

const makeSut = (): ISutTypes => {
  const loadUserByIdRepositoryStub = mockLoadUserByIdRepository();
  const sut = new DbLoadUserById(loadUserByIdRepositoryStub);
  return {
    sut,
    loadUserByIdRepositoryStub,
  };
};

describe('DbLoadUserById', () => {
  it('should call loadUserById', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadUserByIdRepositoryStub, 'loadById');
    await sut.loadById('any_uuid');
    expect(loadSpy).toHaveBeenCalledWith('any_uuid');
  });

  it('should return user on success', async () => {
    const { sut } = makeSut();
    const user = await sut.loadById('any_uuid');
    expect(user).toEqual(mockAccount());
  });

  it('should throw if loadUserByIdRepository throws', async () => {
    const { sut, loadUserByIdRepositoryStub } = makeSut();
    jest.spyOn(loadUserByIdRepositoryStub, 'loadById')
      .mockImplementationOnce(throwError);
    const promise = sut.loadById('any_uuid');
    await expect(promise).rejects.toThrow();
  });
});
