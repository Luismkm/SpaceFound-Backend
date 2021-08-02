import { DbUpdateAvatar } from '@/data/usecases/user/DbUpdateAvatar';

import { IStorageProvider } from '@/data/protocols/storageProvider/IStorageProvider';
import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateAvatarRepository } from '@/data/protocols/db/user/IUpdateAvatarRepository';

import { mockStorageProviderStub } from '@/tests/infra/mock/mockStorageProvider';
import { mockFindUserByIdRepository, mockUpdateAvatarRepository } from '../mocks/mockDbUser';

const mockUuidParam = 'any_uuid';
const mockFilename = 'any_avatar_name';

type ISutTypes = {
  sut: DbUpdateAvatar
  storageProviderStub: IStorageProvider
  findUserByIdRepositoryStub: IFindUserByIdRepository
  updateAvatarRepositoryStub: IUpdateAvatarRepository
}

const makeSut = (): ISutTypes => {
  const storageProviderStub = mockStorageProviderStub();
  const findUserByIdRepositoryStub = mockFindUserByIdRepository();
  const updateAvatarRepositoryStub = mockUpdateAvatarRepository();

  const sut = new DbUpdateAvatar(
    storageProviderStub,
    findUserByIdRepositoryStub,
    updateAvatarRepositoryStub,
  );
  return {
    sut,
    storageProviderStub,
    findUserByIdRepositoryStub,
    updateAvatarRepositoryStub,
  };
};

describe('DbUpdateAvatar', () => {
  it('should call findUserByIdRepository with correct value', async () => {
    const { sut, findUserByIdRepositoryStub } = makeSut();
    const findSpy = jest.spyOn(findUserByIdRepositoryStub, 'findById');
    await sut.update(mockUuidParam, mockFilename);
    expect(findSpy).toHaveBeenCalledWith('any_uuid');
  });

  it('should return if user not exists', async () => {
    const { sut, findUserByIdRepositoryStub } = makeSut();
    jest.spyOn(findUserByIdRepositoryStub, 'findById').mockReturnValueOnce(null);
    const account = await sut.update(mockUuidParam, mockFilename);
    expect(account).toBeNull();
  });

  it('should call deleteFile if user have avatar', async () => {
    const { sut, storageProviderStub } = makeSut();
    const deleteSpy = jest.spyOn(storageProviderStub, 'deleteFile');
    await sut.update(mockUuidParam, mockFilename);
    expect(deleteSpy).toHaveBeenCalledWith('any_avatar');
  });

  it('should call saveFile with correct value', async () => {
    const { sut, storageProviderStub } = makeSut();
    const saveSpy = jest.spyOn(storageProviderStub, 'saveFile');
    await sut.update(mockUuidParam, mockFilename);
    expect(saveSpy).toHaveBeenCalledWith('any_avatar_name');
  });

  it('should call updateRepository with correct value', async () => {
    const { sut, updateAvatarRepositoryStub } = makeSut();
    const updateAvatar = jest.spyOn(updateAvatarRepositoryStub, 'update');
    await sut.update(mockUuidParam, mockFilename);
    expect(updateAvatar).toHaveBeenCalledWith('any_uuid', 'new_avatar');
  });

  it('should return an user on success', async () => {
    const { sut } = makeSut();
    const account = await sut.update(mockUuidParam, mockFilename);
    expect(account).toBeTruthy();
  });
});
