import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { IUpdateUserProfile } from '@/domain/usecases/user/IUpdateUserProfile';
import { DbUpdateUserProfile } from '@/data/usecases/user/DbUpdateUserProfile';

export const makeDbUpdateUserProfile = (): IUpdateUserProfile => {
  const userPostgresRepository = new UserPostgresRepository();
  return new DbUpdateUserProfile(
    userPostgresRepository,
    userPostgresRepository,
  );
};
