import jwt from 'jsonwebtoken';
import { JwtAdapter } from '@/infra/cryptography/jwtAdapter/JwtAdapter';

const makeSut = (): JwtAdapter => new JwtAdapter('secret');

describe('JWT Adapter', () => {
  it('should call sign with correct values', () => {
    const sut = makeSut();
    const signSpy = jest.spyOn(jwt, 'sign');
    sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
});
