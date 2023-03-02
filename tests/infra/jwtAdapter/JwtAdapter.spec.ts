import jwt from 'jsonwebtoken';

import { JwtAdapter } from '@/infra/cryptography/jwtAdapter/JwtAdapter';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token';
  },
}));

const makeSut = (): JwtAdapter => new JwtAdapter('secret');

describe('JWT Adapter', () => {
  it('should call sign with correct values', () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    sut.encrypt('any_uuid');
    expect(signSpy).toHaveBeenCalledWith({ sub: 'any_uuid' }, 'secret');
  });

  it('should return a token sign ok', () => {
    const sut = makeSut();
    const accessToken = sut.encrypt('any_uuid');
    expect(accessToken).toBe('any_token');
  });
});
