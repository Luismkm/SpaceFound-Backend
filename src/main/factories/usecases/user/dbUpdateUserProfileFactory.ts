import { DbUpdateUserProfile } from '@/data/usecases/user/DbUpdateProfile';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';

import { IUpdateUserProfile } from '@/domain/usecases/user/IUpdateUserProfile';
import { AccountPostgresRepository } from '@/infra/database/postgres/account/AccountPostgresRepository';

export const makeDbUpdateUserProfile = (): IUpdateUserProfile => {
  const userPostgresRepository = new UserPostgresRepository();
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbUpdateUserProfile(
    userPostgresRepository,
    accountPostgresRepository,
  );
};
