import { DbUpdateUserProfile } from '@/data/usecases/user/DbUpdateUserProfile';
import { CheckAccountByEmailRepositorySpy, UpdateProfileRepositorySpy } from '@/tests/data/mocks/mockDbUserAccount';

type ISutTypes = {
  sut: DbUpdateUserProfile
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  updateProfileRepositorySpy: UpdateProfileRepositorySpy
}

const makeSut = (): ISutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const updateProfileRepositorySpy = new UpdateProfileRepositorySpy()

  const sut = new DbUpdateUserProfile(checkAccountByEmailRepositorySpy, updateProfileRepositorySpy)

  return {
    sut,
    checkAccountByEmailRepositorySpy,
    updateProfileRepositorySpy,
  }
}

const updateParams = {
  accountId: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  cityId: 1,
}

describe('DbUpdateUserProfile', () => {
  it('should call checkAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const checkSpy = jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail')
    await sut.update(updateParams)
    expect(checkSpy).toHaveBeenCalledWith(updateParams.email)
  });

  it('should return false if update() not updated an user', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockResolvedValueOnce(true)
    const response = await sut.update(updateParams)
    expect(response).toBe(false)
  });

  it('should call updateUserProfileRepository with correct value if email not already useded', async () => {
    const { sut, updateProfileRepositorySpy } = makeSut()
    const updateSpy = jest.spyOn(updateProfileRepositorySpy, 'update')
    await sut.update(updateParams)
    expect(updateSpy).toHaveBeenCalledWith(updateParams)
  });
});
