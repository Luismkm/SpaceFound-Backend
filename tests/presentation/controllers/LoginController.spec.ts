import { mockValidation } from '@/tests/validation/mocks/mockValidation';
import { LoginController } from '@/presentation/controllers/login/login/LoginController';
import { mockAuthentication } from '@/tests/presentation/mocks/mockAccount';

import { IAuthentication } from '@/domain/usecases/account/IAuthentication';
import { IHttpRequest } from '@/presentation/protocols';

const mockRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password',
  },
});

type ISutTypes = {
  sut: LoginController,
  authenticationStub: IAuthentication
}

const makeSut = (): ISutTypes => {
  const authenticationStub = mockAuthentication();
  const validationStub = mockValidation();

  const sut = new LoginController(authenticationStub, validationStub);
  return {
    sut,
    authenticationStub,
  };
};

describe('Login Controller', () => {
  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(mockRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
    });
  });
});
