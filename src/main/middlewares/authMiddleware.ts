import { JwtAdapter } from '@/infra/cryptography/jwtAdapter/JwtAdapter';
import { IMiddleware } from '@/presentation/protocols';
import { TokenValidation } from '@/validation/token/TokenValidation';
import authConfig from '@/main/config/auth';

export const makeAuthMiddleware = (): IMiddleware => {
  const jwtAdapter = new JwtAdapter(authConfig.jwt.secret);
  return new TokenValidation(jwtAdapter);
};
