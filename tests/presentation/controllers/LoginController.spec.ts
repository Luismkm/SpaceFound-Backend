import { MissingParamError } from '@/presentation/errors';
import { badRequest, serverError, success, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { LoginController } from '@/presentation/controllers/user/LoginController';

import { throwError } from '@/tests/domain/mocks';
import { AuthenticationSpy } from '@/tests/presentation/mocks/mockAccount';
import { ValidationSpy } from '@/tests/presentation/mocks/mockValidation';

const mockRequest = (): LoginController.Request => ({
  email: 'any_email',
  password: 'any_password',
});

type ISutTypes = {
  sut: LoginController,
  authenticationSpy: AuthenticationSpy
  validationSpy: ValidationSpy
}

const makeSut = (): ISutTypes => {
  const authenticationSpy = new AuthenticationSpy();
  const validationSpy = new ValidationSpy();

  const sut = new LoginController(authenticationSpy, validationSpy);
  return {
    sut,
    authenticationSpy,
    validationSpy,
  };
};

describe('Login Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual({
      email: request.email,
      password: request.password,
    });
  });

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('any_field');
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(authenticationSpy.params).toEqual({
      email: request.email,
      password: request.password,
    });
  });

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut();
    authenticationSpy.result = null;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return 200 if valid credentials are provided', async () => {
    const { sut, authenticationSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(success(authenticationSpy.result));
  });
});
