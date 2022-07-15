import { CheckAccountByEmailRepositorySpy } from '../mocks';
import { DbUpdateUserProfile } from '@/data/usecases/user/DbUpdateUserProfile';

type ISutTypes = {
  sut: DbUpdateUserProfile
  checkAccountByEmailRepository: CheckAccountByEmailRepositorySpy
}

const makeSut = (): ISutTypes => {
  const checkAccountByEmailRepository = new CheckAccountByEmailRepositorySpy();
  const sut = new DbUpdateUserProfile(
    checkAccountByEmailRepository,
  );
  return {
    sut,
    checkAccountByEmailRepository,
  };
};

describe('DbUpdateUserProfile', () => {
  it('should call CheckAccountByEmailRepository with correct value', async () => {
    const { sut, checkAccountByEmailRepository } = makeSut();
    await sut.update({ userId: 'any_uuid', name: 'any_name', email: 'any_email' });
    expect(checkAccountByEmailRepository.params).toEqual('any_email');
  });
});
