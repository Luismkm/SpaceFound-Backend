import { LoginController } from '@/presentation/controllers/login/login/LoginController';
import { MissingParamError } from '@/presentation/errors';
import {
  badRequest, serverError, success, unauthorized,
} from '@/presentation/helpers/http/httpHelper';

import { IAuthentication } from '@/domain/usecases/account/IAuthentication';
import { IHttpRequest, IValidation } from '@/presentation/protocols';

import { throwError } from '@/tests/domain/mocks';
import { mockAuthentication } from '@/tests/presentation/mocks/mockAccount';
import { mockValidation } from '@/tests/validation/mocks/mockValidation';

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password',
  },
});

type ISutTypes = {
  sut: LoginController,
  authenticationStub: IAuthentication
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const authenticationStub = mockAuthentication();
  const validationStub = mockValidation();

  const sut = new LoginController(authenticationStub, validationStub);
  return {
    sut,
    authenticationStub,
    validationStub,
  };
};

describe('Login Controller', () => {
  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(authSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(success({ accessToken: 'any_token' }));
  });
});
