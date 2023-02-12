import { DbUpdateAvatar } from '@/data/usecases/user/DbUpdateAvatar';
import { IUpdateAvatar } from '@/domain/usecases/user';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { DiskStorageProvider } from '@/infra/storageProvider/DiskStorageProvider';

export const makeDbUpdateAvatar = (): IUpdateAvatar => {
  const storageProvider = new DiskStorageProvider();
  const userPostgresRepository = new UserPostgresRepository();
  const accountPostgresRepository = new UserPostgresRepository();
  return new DbUpdateAvatar(
    storageProvider,
    userPostgresRepository,
    accountPostgresRepository,
  );
};
