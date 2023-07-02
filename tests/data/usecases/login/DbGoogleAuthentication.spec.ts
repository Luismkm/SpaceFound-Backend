import { DbGoogleAuthentication } from '@/data/usecases/login/DbGoogleAuthentication'
import { EncrypterSpy } from '@/tests/data/mocks/mockCryptography'
import { LoadUserByEmailRepositorySpy } from '@/tests/data/mocks/mockDbUser'

type ISutTypes = {
  sut: DbGoogleAuthentication
  loadUsertByEmailRepositorySpy: LoadUserByEmailRepositorySpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): ISutTypes => {
  const loadUsertByEmailRepositorySpy = new LoadUserByEmailRepositorySpy()
  const encrypterSpy = new EncrypterSpy()

  const sut = new DbGoogleAuthentication(loadUsertByEmailRepositorySpy, encrypterSpy)

  return {
    sut,
    loadUsertByEmailRepositorySpy,
    encrypterSpy,
  }
}

describe('DbGoogleAuthentication Usecase', () => {
  it('should call LoadUserByEmailRepository with correct value', async () => {
    const { sut, loadUsertByEmailRepositorySpy } = makeSut()
    await sut.auth({ email: 'any_email' })
    expect(loadUsertByEmailRepositorySpy.params).toBe('any_email')
  })

  it('should call Encrypter with correct value', async () => {
    const { sut, encrypterSpy } = makeSut()
    await sut.auth({ email: 'any_email' })
    expect(encrypterSpy.params).toEqual({ sub: 'any_uuid', accountType: 'user' })
  })

  it('should return an accessToken on success', async () => {
    const { sut, encrypterSpy } = makeSut()
    const token = await sut.auth({ email: 'any_email' })
    expect(encrypterSpy.textEncrypted).toEqual(token)
  })
})
