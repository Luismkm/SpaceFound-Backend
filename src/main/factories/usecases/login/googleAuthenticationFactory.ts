import { JwtAdapter } from '@/infra/cryptography/jwtAdapter/JwtAdapter';
import authConfig from '@/main/config/auth';

import { IGoogleAuthentication } from '@/domain/usecases/login/IGoogleAuthentication';
import { GoogleProviderPostgresRepository } from '@/infra/database/postgres/login/GoogleProviderPostgresRepository';
import { DbGoogleAuthentication } from '@/data/usecases/login/DbGoogleAuthentication';

export const makeGoogleAuthentication = (): IGoogleAuthentication => {
  const jwtAdapter = new JwtAdapter(authConfig.jwt.secret);
  const googleProviderPostgresRepository = new GoogleProviderPostgresRepository();
  return new DbGoogleAuthentication(
    googleProviderPostgresRepository,
    jwtAdapter,
  );
};
