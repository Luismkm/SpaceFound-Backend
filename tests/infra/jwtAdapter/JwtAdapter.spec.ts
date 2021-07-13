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
    sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });

  it('should return a token sign success', () => {
    const sut = makeSut();
    const accessToken = sut.encrypt('any_id');
    expect(accessToken).toBe('any_token');
  });
});
