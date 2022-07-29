import { DbUpdateAvatar } from '@/data/usecases/account/DbUpdateAvatar';
import { IUpdateAvatar } from '@/domain/usecases/account';
import { AccountPostgresRepository } from '@/infra/database/postgres/account/AccountPostgresRepository';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { DiskStorageProvider } from '@/infra/storageProvider/DiskStorageProvider';

export const makeDbUpdateAvatar = (): IUpdateAvatar => {
  const storageProvider = new DiskStorageProvider();
  const userPostgresRepository = new UserPostgresRepository();
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbUpdateAvatar(
    storageProvider,
    userPostgresRepository,
    accountPostgresRepository,
  );
};
