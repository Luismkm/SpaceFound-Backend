import { ServerError, MissingParamError } from '@/presentation/errors';
import { badRequest, serverError } from '@/presentation/helpers/http/httpHelper';
import { SignUpController } from '@/presentation/controllers/login/signUp/SignUpController';

import { ICreateAccountRepository } from '@/data/protocols';
import { IHttpRequest, IValidation } from '@/presentation/controllers/login/signUp/SignUpControllerProtocols';

import { mockCreateAccount } from '@/tests/presentation/mocks';
import { mockValidation } from '@/tests/validation/mocks/mockValidations';

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
}

const makeSut = (): ISutTypes => {
  const createAccountStub = mockCreateAccount();
  const validationStub = mockValidation();
  const sut = new SignUpController(createAccountStub, validationStub);
  return {
    sut,
    createAccountStub,
    validationStub,
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
      .mockImplementationOnce(() => { throw new Error(); });
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
});
