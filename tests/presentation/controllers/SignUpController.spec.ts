import MockDate from 'mockdate';

import { ServerError, MissingParamError, EmailInUseError } from '@/presentation/errors';
import { badRequest, forbidden, serverError, success } from '@/presentation/helpers/http/httpHelper';

import { throwError } from '@/tests/domain/mocks';
import { ValidationSpy } from '@/tests/presentation/mocks/mockValidation';
import { AuthenticationSpy, CreateAccountSpy } from '@/tests/presentation/mocks';
import { SignUpController } from '@/presentation/controllers/account/SignUpController';

const mockRequest = (): SignUpController.Request => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_passowrd',
  passwordConfirmation: 'any_password',
  cityId: 1,
});

type ISutTypes = {
  sut: SignUpController,
  createAccountSpy: CreateAccountSpy
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

const makeSut = (): ISutTypes => {
  const createAccountSpy = new CreateAccountSpy();
  const validationSpy = new ValidationSpy();
  const authenticationSpy = new AuthenticationSpy();
  const sut = new SignUpController(createAccountSpy, validationSpy, authenticationSpy);
  return {
    sut,
    createAccountSpy,
    validationSpy,
    authenticationSpy,
  };
};

describe('SignUp Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  it('should call CreateAccount with correct values', async () => {
    const { sut, createAccountSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(createAccountSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password,
      cityId: request.cityId,
      createdAt: new Date(),
    });
  });

  it('should return 500 if CreateAccount throws ', async () => {
    const { sut, createAccountSpy } = makeSut();
    jest.spyOn(createAccountSpy, 'create').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut();
    const request = mockRequest();
    await sut.handle(request);
    expect(validationSpy.input).toEqual(request);
  });

  it('should return 400 if Validation return an error', async () => {
    const { sut, validationSpy } = makeSut();
    validationSpy.error = new MissingParamError('any_param');
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(validationSpy.error));
  });

  it('should return 403 if CreateAccount returns false', async () => {
    const { sut, createAccountSpy } = makeSut();
    createAccountSpy.result = false;
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
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

  it('should return 500 if Authentication throws', async () => {
    const { sut, authenticationSpy } = makeSut();
    jest.spyOn(authenticationSpy, 'auth').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('should return 200 if valid data is provided', async () => {
    const { sut, authenticationSpy } = makeSut();
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(success(authenticationSpy.result));
  });
});
