import { DbUpdateAvatar } from '@/data/usecases/user/DbUpdateAvatar';

import { IStorageProvider } from '@/data/protocols/storageProvider/IStorageProvider';
import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';

import { StorageProviderSpy } from '@/tests/infra/mock/mockStorageProvider';
import { mockFindUserByIdRepository } from '../mocks/mockDbUser';
import { UpdateAvatarRepositorySpy } from '@/tests/data/mocks';

const mockUuidParam = 'any_uuid';
const mockFilename = 'any_url';

type ISutTypes = {
  sut: DbUpdateAvatar
  storageProviderSpy: IStorageProvider
  findUserByIdRepositoryStub: IFindUserByIdRepository
  updateAvatarRepositorySpy: UpdateAvatarRepositorySpy
}

const makeSut = (): ISutTypes => {
  const storageProviderSpy = new StorageProviderSpy();
  const findUserByIdRepositoryStub = mockFindUserByIdRepository();
  const updateAvatarRepositorySpy = new UpdateAvatarRepositorySpy();

  const sut = new DbUpdateAvatar(
    storageProviderSpy,
    findUserByIdRepositoryStub,
    updateAvatarRepositorySpy,
  );
  return {
    sut,
    storageProviderSpy,
    findUserByIdRepositoryStub,
    updateAvatarRepositorySpy,
  };
};

describe('DbUpdateAvatar', () => {
  it('should call findUserByIdRepository with correct value', async () => {
    const { sut, findUserByIdRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(findUserByIdRepositoryStub, 'findById');
    await sut.updateAvatar({ userId: mockUuidParam, fileName: mockFilename });
    expect(findSpy).toHaveBeenCalledWith('any_uuid');
  });

  it('should return if user not exists', async () => {
    const { sut, findUserByIdRepositoryStub } = makeSut();
    jest.spyOn(findUserByIdRepositoryStub, 'findById').mockReturnValueOnce(null);
    const account = await sut.updateAvatar({ userId: mockUuidParam, fileName: mockFilename });
    expect(account).toBeNull();
  });

  it('should call deleteFile if user have avatar', async () => {
    const { sut, storageProviderSpy } = makeSut();
    const deleteSpy = jest.spyOn(storageProviderSpy, 'deleteFile');
    await sut.updateAvatar({ userId: mockUuidParam, fileName: mockFilename });
    expect(deleteSpy).toHaveBeenCalledWith('any_avatar');
  });

  it('should call saveFile with correct value', async () => {
    const { sut, storageProviderSpy } = makeSut();
    const saveSpy = jest.spyOn(storageProviderSpy, 'saveFile');
    await sut.updateAvatar({ userId: mockUuidParam, fileName: mockFilename });
    expect(saveSpy).toHaveBeenCalledWith('any_url');
  });

  it('should call updateRepository with correct value', async () => {
    const { sut, storageProviderSpy, updateAvatarRepositorySpy } = makeSut();
    const updateParams = { userId: mockUuidParam, fileName: mockFilename };
    await sut.updateAvatar(updateParams);
    expect(updateAvatarRepositorySpy.params).toEqual({
      userId: updateParams.userId,
      fileName: 'new_url',
    });
  });

  it('should return an user on success', async () => {
    const { sut } = makeSut();
    const account = await sut.updateAvatar({ userId: mockUuidParam, fileName: mockFilename });
    expect(account).toBeTruthy();
  });
});
