import { DbUpdateAvatar } from '@/data/usecases/user/DbUpdateAvatar';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { DiskStorageProvider } from '@/infra/storageProvider/DiskStorageProvider';

import { IUpdateAvatar } from '@/domain/usecases/user/IUpdateAvatar';

export const makeDbUpdateAvatar = (): IUpdateAvatar => {
  const storageProvider = new DiskStorageProvider();
  const userPostgresRepository = new UserPostgresRepository();
  return new DbUpdateAvatar(
    storageProvider,
    userPostgresRepository,
    userPostgresRepository,
  );
};
