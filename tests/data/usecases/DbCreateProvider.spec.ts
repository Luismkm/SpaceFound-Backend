import DbCreateProvider from '@/data/usecases/provider/DbCreateProvider';

import { ICreateProviderRepository } from '@/data/protocols/db/provider/ICreateProviderRepository';
import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';

import { mockUuidGenerator } from '../mocks';
import { mockCreateProvider } from '../mocks/mockDbProvider';
import { mockProviderDTO } from '@/tests/domain/mocks/mockProvider';

type ISutTypes = {
  sut: DbCreateProvider
  uuidStub: IUuidGenerator
  createProviderRepositoryStub: ICreateProviderRepository
}

const makeSut = (): ISutTypes => {
  const uuidStub = mockUuidGenerator();
  const createProviderRepositoryStub = mockCreateProvider();
  const sut = new DbCreateProvider(uuidStub, createProviderRepositoryStub);
  return {
    sut,
    uuidStub,
    createProviderRepositoryStub,
  };
};

describe('DbCreateProvider Usecase', () => {
  it('should call uuidGenerator', async () => {
    const { sut, uuidStub } = makeSut();
    const uuidSpy = jest.spyOn(uuidStub, 'uuidGenerator');
    await sut.create(mockProviderDTO());
    expect(uuidSpy).toHaveBeenCalled();
  });

  it('should call CreateProviderRepository with correct values', async () => {
    const { sut, createProviderRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createProviderRepositoryStub, 'create');
    await sut.create(mockProviderDTO());
    expect(createSpy).toHaveBeenCalledWith({
      idBusiness: 0,
      description: 'any_description',
      idUser: 'any_uuid',
      id: 'any_uuid',
    });
  });

  it('should return a Provider on success', async () => {
    const { sut } = makeSut();
    const provider = await sut.create(mockProviderDTO());
    expect(provider).toBeTruthy();
  });
});
