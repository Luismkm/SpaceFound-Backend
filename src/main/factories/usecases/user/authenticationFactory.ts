import { DbAuthentication } from '@/data/usecases/user/DbAuthentication';
import { BcryptAdapter } from '@/infra/cryptography/bcryptAdapter/BcryptAdapter';
import { JwtAdapter } from '@/infra/cryptography/jwtAdapter/JwtAdapter';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import authConfig from '@/main/config/auth';

import { IAuthentication } from '@/domain/usecases/user/IAuthentication';

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(authConfig.jwt.secret);
  const accountPostgresRepository = new UserPostgresRepository();
  return new DbAuthentication(
    accountPostgresRepository,
    bcryptAdapter,
    jwtAdapter,

  );
};
