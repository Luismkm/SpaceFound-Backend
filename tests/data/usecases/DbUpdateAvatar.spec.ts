import { DbUpdateAvatar } from '@/data/usecases/user/DbUpdateAvatar';

import { IStorageProvider } from '@/data/protocols/storageProvider/IStorageProvider';

import { StorageProviderSpy } from '@/tests/infra/mock/mockStorageProvider';
import { UpdateAvatarRepositorySpy } from '@/tests/data/mocks';
import { FindUserByIdRepositorySpy } from '@/tests/data/mocks/mockDbUser';

const mockUuidParam = 'any_uuid';
const mockFilename = 'any_url';

type ISutTypes = {
  sut: DbUpdateAvatar
  storageProviderSpy: IStorageProvider
  findUserByIdRepositorySpy: FindUserByIdRepositorySpy
  updateAvatarRepositorySpy: UpdateAvatarRepositorySpy
}

const makeSut = (): ISutTypes => {
  const storageProviderSpy = new StorageProviderSpy();
  const findUserByIdRepositorySpy = new FindUserByIdRepositorySpy();
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
    const findSpy = jest.spyOn(findUserByIdRepositorySpy, 'findById');
    await sut.updateAvatar({ accountId: mockUuidParam, fileName: mockFilename });
    expect(findSpy).toHaveBeenCalledWith('any_uuid');
  });

  it('should return if user not exists', async () => {
    const { sut, findUserByIdRepositorySpy } = makeSut();
    jest.spyOn(findUserByIdRepositorySpy, 'findById').mockReturnValueOnce(null);
    const account = await sut.updateAvatar({ accountId: mockUuidParam, fileName: mockFilename });
    expect(account).toBeNull();
  });

  it('should call deleteFile if user have avatar', async () => {
    const { sut, storageProviderSpy } = makeSut();
    const deleteSpy = jest.spyOn(storageProviderSpy, 'deleteFile');
    await sut.updateAvatar({ accountId: mockUuidParam, fileName: mockFilename });
    expect(deleteSpy).toHaveBeenCalledWith('any_avatar');
  });

  it('should call saveFile with correct value', async () => {
    const { sut, storageProviderSpy } = makeSut();
    const saveSpy = jest.spyOn(storageProviderSpy, 'saveFile');
    await sut.updateAvatar({ accountId: mockUuidParam, fileName: mockFilename });
    expect(saveSpy).toHaveBeenCalledWith('any_url');
  });

  it('should call updateRepository with correct value', async () => {
    const { sut, storageProviderSpy, updateAvatarRepositorySpy } = makeSut();
    const updateParams = { accountId: mockUuidParam, fileName: mockFilename };
    await sut.updateAvatar(updateParams);
    expect(updateAvatarRepositorySpy.params).toEqual({
      accountId: updateParams.accountId,
      fileName: 'new_url',
    });
  });

  it('should return an user on ok', async () => {
    const { sut } = makeSut();
    const account = await sut.updateAvatar({ accountId: mockUuidParam, fileName: mockFilename });
    expect(account).toBeTruthy();
  });
});
