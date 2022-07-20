import Mockdate from 'mockdate';

import { DbFindUserById } from '@/data/usecases/user/DbFindUserById';
import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';

import { mockAccount, throwError } from '@/tests/domain/mocks';
import { mockFindUserByIdRepository } from '@/tests/data/mocks/mockDbUser';

type ISutTypes = {
  sut: DbFindUserById
  findUserByIdRepositoryStub: IFindUserByIdRepository
}

const makeSut = (): ISutTypes => {
  const findUserByIdRepositoryStub = mockFindUserByIdRepository();
  const sut = new DbFindUserById(findUserByIdRepositoryStub);
  return {
    sut,
    findUserByIdRepositoryStub,
  };
};

describe('DbFindUserById', () => {
  beforeAll(() => {
    Mockdate.set(new Date());
  });

  afterAll(() => {
    Mockdate.reset();
  });

  it('should call findUserById', async () => {
    const { sut, findUserByIdRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(findUserByIdRepositoryStub, 'findById');
    await sut.findById('any_uuid');
    expect(findSpy).toHaveBeenCalledWith('any_uuid');
  });

  it('should return user on success', async () => {
    const { sut } = makeSut();
    const user = await sut.findById('any_uuid');
    expect(user).toEqual(mockAccount());
  });

  it('should throw if findUserByIdRepository throws', async () => {
    const { sut, findUserByIdRepositoryStub } = makeSut();
    jest.spyOn(findUserByIdRepositoryStub, 'findById')
      .mockImplementationOnce(throwError);
    const promise = sut.findById('any_uuid');
    await expect(promise).rejects.toThrow();
  });
});
