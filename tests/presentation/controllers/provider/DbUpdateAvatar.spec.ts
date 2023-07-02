import { IStorageProvider } from '@/data/protocols/storageProvider/IStorageProvider';

import { StorageProviderSpy } from '@/tests/infra/mock/mockStorageProvider';
import { LoadProfileByIdRepositorySpy, UpdateAvatarRepositorySpy } from '@/tests/data/mocks/mockDbProvider';
import { DbUpdateAvatar } from '@/data/usecases/provider/DbUpdateAvatar';

const mockUuidParam = 'any_uuid';
const mockFilename = 'any_url';

type ISutTypes = {
  sut: DbUpdateAvatar
  storageProviderSpy: IStorageProvider
  findUserByIdRepositorySpy: LoadProfileByIdRepositorySpy
  updateAvatarRepositorySpy: UpdateAvatarRepositorySpy
}

const makeSut = (): ISutTypes => {
  const storageProviderSpy = new StorageProviderSpy();
  const findUserByIdRepositorySpy = new LoadProfileByIdRepositorySpy();
  const updateAvatarRepositorySpy = new UpdateAvatarRepositorySpy();

  const sut = new DbUpdateAvatar(
    storageProviderSpy,
    findUserByIdRepositorySpy,
    updateAvatarRepositorySpy,
  );
  return {
    sut,
    storageProviderSpy,
    findUserByIdRepositorySpy,
    updateAvatarRepositorySpy,
  };
};

describe('DbUpdateAvatar', () => {
  it('should call findUserByIdRepository with correct value', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    const findSpy = jest.spyOn(findUserByIdRepositorySpy, 'loadProfileById');
    await sut.updateAvatar({ accountId: mockUuidParam, filename: mockFilename });
    expect(findSpy).toHaveBeenCalledWith('any_uuid');
  });

  it('should return if user not exists', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    jest.spyOn(findUserByIdRepositorySpy, 'loadProfileById').mockReturnValueOnce(null);
    const account = await sut.updateAvatar({ accountId: mockUuidParam, filename: mockFilename });
    expect(account).toBeNull();
  });

  it('should call deleteFile if user have avatar', async () => {
    const { sut, storageProviderSpy } = makeSut();
    const deleteSpy = jest.spyOn(storageProviderSpy, 'deleteFile');
    await sut.updateAvatar({ accountId: mockUuidParam, filename: mockFilename });
    expect(deleteSpy).toHaveBeenCalledWith('any_avatar');
  });

  it('should call saveFile with correct value', async () => {
    const { sut, storageProviderSpy } = makeSut();
    const saveSpy = jest.spyOn(storageProviderSpy, 'saveFile');
    await sut.updateAvatar({ accountId: mockUuidParam, filename: mockFilename });
    expect(saveSpy).toHaveBeenCalledWith('any_url');
  });

  it('should call updateRepository with correct value', async () => {
    const { sut, storageProviderSpy, updateAvatarRepositorySpy } = makeSut();
    const updateParams = { accountId: mockUuidParam, filename: mockFilename };
    await sut.updateAvatar(updateParams);
    expect(updateAvatarRepositorySpy.params).toEqual({
      accountId: updateParams.accountId,
      filename: 'new_url',
    });
  });

  it('should return an user on ok', async () => {
    const { sut } = makeSut();
    const account = await sut.updateAvatar({ accountId: mockUuidParam, filename: mockFilename });
    expect(account).toBeTruthy();
  });
});
