import { GoogleProviderController } from '@/presentation/controllers/login/googleProviderController'
import { ok } from '@/presentation/helpers/http/httpHelper'
import { CreateGoogleAccountSpy, GoogleApiSpy, GoogleAuthenticationSpy } from '@/tests/presentation/mocks/mockGoogle'

const makeSut = (): any => {
  const googleApiSpy = new GoogleApiSpy()
  const createAccountSpy = new CreateGoogleAccountSpy()
  const googleAuthenticationSpy = new GoogleAuthenticationSpy()
  const sut = new GoogleProviderController(googleApiSpy, createAccountSpy, googleAuthenticationSpy)

  return {
    sut,
    googleApiSpy,
    createAccountSpy,
    googleAuthenticationSpy,
  }
}

describe('Google Provider Controller', () => {
  it('should call GoogleApi.loadUser with correct values', async () => {
    const { sut, googleApiSpy } = makeSut();
    const request = { code: 'any_code' };
    await sut.handle(request);
    expect(googleApiSpy.params).toEqual(request.code);
  });

  it('should call CreateAccount with correct values', async () => {
    const { sut, createAccountSpy } = makeSut();
    const request = { code: 'any_code' };
    await sut.handle(request);
    expect(createAccountSpy.params).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      picture: 'any_url',
    });
  });

  it('should call GoogleAuthenticationSpy with correct values', async () => {
    const { sut, googleAuthenticationSpy } = makeSut();
    const request = { code: 'any_code' };
    await sut.handle(request);
    expect(googleAuthenticationSpy.params).toEqual({ email: 'any_email' });
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut, googleAuthenticationSpy } = makeSut();
    const request = { code: 'any_code' };
    const httpResponse = await sut.handle(request);
    expect(httpResponse).toEqual(ok(googleAuthenticationSpy.result));
  });
})
