import { ICreateAccountRepository } from '@/data/protocols';
import { IHttpRequest } from '@/presentation/protocols';
import { mockCreateAccount } from '@/tests/presentation/mocks';
import { SignUpController } from '@/presentation/controllers/login/signUp/SignUpController';

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
});
