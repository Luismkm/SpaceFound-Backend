import { CheckAccountByEmailRepositorySpy } from '@/tests/data/mocks';
import { DbUpdateUserProfile } from '@/data/usecases/user/DbUpdateUserProfile';
import { UpdateUserProfileRepository } from '@/data/protocols';
import { UpdateUserProfileRepositorySpy } from '@/tests/data/mocks/mockDbUser';

const mockDbUpdateUserProfileParams = (): UpdateUserProfileRepository.Params => ({
  accountId: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  cityId: 1,
});

type ISutTypes = {
  sut: DbUpdateUserProfile
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  updateUserProfileRepositorySpy: UpdateUserProfileRepositorySpy
}

const makeSut = (): ISutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy();
  const updateUserProfileRepositorySpy = new UpdateUserProfileRepositorySpy();
  const sut = new DbUpdateUserProfile(
    checkAccountByEmailRepositorySpy,
    updateUserProfileRepositorySpy,
  );

  return {
    sut,
    checkAccountByEmailRepositorySpy,
    updateUserProfileRepositorySpy,
  };
};

describe('DbUpdateUserProfile', () => {
  it('should call CheckAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    await sut.update({ accountId: 'any_uuid', name: 'any_name', email: 'any_email', cityId: 1 });
    expect(checkAccountByEmailRepositorySpy.params).toEqual('any_email');
  });

  it('should not call UpdateUserProfileRepository if new email already registed', async () => {
    const { sut, checkAccountByEmailRepositorySpy, updateUserProfileRepositorySpy } = makeSut();
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
      .mockResolvedValueOnce(Promise.resolve(true));
    const updateSpy = jest.spyOn(updateUserProfileRepositorySpy, 'update');
    const params = mockDbUpdateUserProfileParams();
    await sut.update(params);
    expect(updateSpy).not.toHaveBeenCalled();
  });

  it('should call UpdateUserProfileRepository with correct value', async () => {
    const { sut, updateUserProfileRepositorySpy } = makeSut();
    const params = mockDbUpdateUserProfileParams();
    await sut.update(params);
    expect(updateUserProfileRepositorySpy.params).toEqual(params);
  });

  it('should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut();
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
      .mockResolvedValueOnce(Promise.resolve(true));
    const params = mockDbUpdateUserProfileParams();
    const isValid = await sut.update(params);
    expect(isValid).toBe(false);
  });

  it('should return true if DbUpdateUserProfile updated with ok', async () => {
    const { sut } = makeSut();
    const updated = await sut.update(mockDbUpdateUserProfileParams());
    expect(updated).toBe(true);
  });
});
