import DbCreateRate from '@/data/usecases/rate/DbCreateRate';

import { ICreateRateRepository } from '@/data/protocols/db/rate/ICreateRateRepository';

import { mockRate, mockRateDTO } from '@/tests/domain/mocks/mockRate';
import { throwError } from '@/tests/domain/mocks';
import { mockCreateRateRepository } from '../mocks/mockDbRate';

type ISutTypes = {
  sut: DbCreateRate
  createRateRepositoryStub: ICreateRateRepository
}

const makeSut = ():ISutTypes => {
  const createRateRepositoryStub = mockCreateRateRepository();
  const sut = new DbCreateRate(createRateRepositoryStub);
  return {
    sut,
    createRateRepositoryStub,
  };
};

describe('Db Create Rate', () => {
  it('should call CreateRateRepository with correct values', async () => {
    const { sut, createRateRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createRateRepositoryStub, 'create');
    await sut.create(mockRateDTO());
    expect(createSpy).toHaveBeenCalledWith({
      idUser: 'any_uuid',
      idProvider: 'any_uuid',
      star: 1,
      comment: 'any_comment',
    });
  });

  it('Should throw if CreateRateRepository throws ', async () => {
    const { sut, createRateRepositoryStub } = makeSut();
    jest
      .spyOn(createRateRepositoryStub, 'create')
      .mockImplementationOnce(throwError);
    const promise = sut.create(mockRateDTO());
    await expect(promise).rejects.toThrow();
  });

  it('Should return a rate on success', async () => {
    const { sut } = makeSut();
    const rate = await sut.create(mockRateDTO());
    expect(rate).toEqual(mockRate());
  });
});
