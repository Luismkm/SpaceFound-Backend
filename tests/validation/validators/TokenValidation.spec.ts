import { ok, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { TokenValidation } from '@/validation/token/TokenValidation';

import { IDecrypter } from '@/data/protocols/cryptography';
import { IHttpRequest } from '@/presentation/protocols';

import { mockDecrypter } from '@/tests/data/mocks';
import { throwError } from '@/tests/domain/mocks';

type ISutTypes = {
  sut: TokenValidation
  decrypterStub: IDecrypter
}

const makeFakeRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

const makeSut = (): ISutTypes => {
  const decrypterStub = mockDecrypter();
  const sut = new TokenValidation(decrypterStub);
  return {
    sut,
    decrypterStub,
  };
};

describe('Token Validations', () => {
  it('should call decrypt with correct value', () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    sut.handle(makeFakeRequest());
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  it('should return ok on valid token', () => {
    const { sut } = makeSut();
    const httpResponse = sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok({ userId: 'any_value' }));
  });

  it('should return unauthorized on invalid token', () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError);
    const httpResponse = sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return unauthorized on not pass token', () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(throwError);
    const httpResponse = sut.handle({});
    expect(httpResponse).toEqual(unauthorized());
  });
});
