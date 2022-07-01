import { DbUpdateUserProfile } from '@/data/usecases/user/DbUpdateProfile';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';

import { IUpdateProfile } from '@/domain/usecases/user/IUpdateProfile';
import { AccountPostgresRepository } from '@/infra/database/postgres/account/AccountPostgresRepository';

export const makeDbUpdateProfile = (): IUpdateProfile => {
  const userPostgresRepository = new UserPostgresRepository();
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbUpdateUserProfile(
    userPostgresRepository,
    accountPostgresRepository,
  );
};
