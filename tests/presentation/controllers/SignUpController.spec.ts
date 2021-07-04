import { mockCreateAccount } from '@/tests/presentation/mocks';

import { ServerError } from '@/presentation/errors';
import { serverError } from '@/presentation/helpers/http/httpHelper';
import { SignUpController } from '@/presentation/controllers/login/signUp/SignUpController';

import { ICreateAccountRepository } from '@/data/protocols';
import { IHttpRequest } from '@/presentation/controllers/login/signUp/SignUpControllerProtocols';

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
}

const makeSut = (): ISutTypes => {
  const createAccountStub = mockCreateAccount();
  const sut = new SignUpController(createAccountStub);
  return {
    sut,
    createAccountStub,
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
});
