import { ok, unauthorized } from '@/presentation/helpers/http/httpHelper';
import { TokenValidation } from '@/validation/token/TokenValidation';

import { IHttpRequest } from '@/presentation/protocols';

import { throwError } from '@/tests/domain/mocks';
import { DecrypterSpy } from '@/tests/data/mocks/mockCryptography';

type ISutTypes = {
  sut: TokenValidation
  decrypterSpy: DecrypterSpy
}

const makeFakeRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

const makeSut = (): ISutTypes => {
  const decrypterSpy = new DecrypterSpy();
  const sut = new TokenValidation(decrypterSpy);
  return {
    sut,
    decrypterSpy,
  };
};

describe('Token Validations', () => {
  it('should call decrypt with correct value', () => {
    const { sut, decrypterSpy } = makeSut();
    sut.handle(makeFakeRequest());
    expect(decrypterSpy.token).toBe('any_token');
  });

  it('should return success on valid token', () => {
    const { sut } = makeSut();
    const httpResponse = sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(ok({ accountId: 'any_value', accountType: 'any_account' }));
  });

  it('should return unauthorized on invalid token', () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError);
    const httpResponse = sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(unauthorized());
  });

  it('should return unauthorized on not pass token', () => {
    const { sut, decrypterSpy } = makeSut();
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError);
    const httpResponse = sut.handle({});
    expect(httpResponse).toEqual(unauthorized());
  });
});
