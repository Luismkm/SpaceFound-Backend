import Mockdate from 'mockdate';

import { DbFindUserById } from '@/data/usecases/user/DbFindUserById';

import { mockUser, throwError } from '@/tests/domain/mocks';
import { FindUserByIdRepositorySpy } from '../mocks/mockDbUser';

type ISutTypes = {
  sut: DbFindUserById
  findUserByIdRepositorySpy: FindUserByIdRepositorySpy
}

const makeSut = (): ISutTypes => {
  const findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();
  const sut = new DbFindUserById(findUserByIdRepositorySpy);
  return {
    sut,
    findUserByIdRepositorySpy,
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
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const findSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');
    await sut.findById('any_uuid');
    expect(findSpy).toHaveBeenCalledWith('any_uuid');
  });

  it('should return user on success', async () => {
    const { sut } = makeSut();
    const user = await sut.findById('any_uuid');
    expect(user).toEqual(mockUser());
  });

  it('should throw if findUserByIdRepository throws', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    jest.spyOn(findUserByIdRepositorySpy, 'findById')
      .mockImplementationOnce(throwError);
    const promise = sut.findById('any_uuid');
    await expect(promise).rejects.toThrow();
  });
});
