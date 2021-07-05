import { ServerError, MissingParamError, EmailInUseError } from '@/presentation/errors';
import { SignUpController } from '@/presentation/controllers/login/signUp/SignUpController';
import {
  badRequest, forbidden, serverError, success,
} from '@/presentation/helpers/http/httpHelper';

import { ICreateAccountRepository } from '@/data/protocols';
import { IAuthentication, IHttpRequest, IValidation } from '@/presentation/controllers/login/signUp/SignUpControllerProtocols';

import { mockAuthentication, mockCreateAccount } from '@/tests/presentation/mocks';
import { mockValidation } from '@/tests/validation/mocks/mockValidations';
import { mockAccount, throwError } from '@/tests/domain/mocks';

const mockRequest = ():IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

type ISutTypes = {
  sut: SignUpController,
  createAccountStub: ICreateAccountRepository
  validationStub: IValidation
  authenticationStub: IAuthentication
}

const makeSut = (): ISutTypes => {
  const createAccountStub = mockCreateAccount();
  const validationStub = mockValidation();
  const authenticationStub = mockAuthentication();
  const sut = new SignUpController(createAccountStub, validationStub, authenticationStub);
  return {
    sut,
    createAccountStub,
    validationStub,
    authenticationStub,
  };
};

describe('SignUp Controller', () => {
  it('should call CreateAccount with correct values', async () => {
    const { sut, createAccountStub } = makeSut();
    const createSpy = jest.spyOn(createAccountStub, 'create');
    await sut.handle(mockRequest());
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('should return 500 if CreateAccount throws ', async () => {
    const { sut, createAccountStub } = makeSut();
    jest.spyOn(createAccountStub, 'create')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpResponse = mockRequest();
    await sut.handle(httpResponse);
    expect(validateSpy).toHaveBeenLastCalledWith(httpResponse.body);
  });

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });

  it('should return 403 if CreateAccount returns null', async () => {
    const { sut, createAccountStub } = makeSut();
    jest.spyOn(createAccountStub, 'create').mockReturnValueOnce(null);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
  });

  it('should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(mockRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(success(mockAccount()));
  });
});
