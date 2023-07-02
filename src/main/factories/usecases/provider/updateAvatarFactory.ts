import { DbUpdateAvatar } from '@/data/usecases/provider/DbUpdateAvatar';
import { IUpdateAvatar } from '@/domain/usecases/provider/IUpdateAvatar';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';
import { DiskStorageProvider } from '@/infra/storageProvider/DiskStorageProvider';

export const makeDbUpdateAvatar = (): IUpdateAvatar => {
  const storageProvider = new DiskStorageProvider();
  const providerPostgresRepository = new ProviderPostgresRepository();
  const accountPostgresRepository = new ProviderPostgresRepository();
  return new DbUpdateAvatar(
    storageProvider,
    providerPostgresRepository,
    accountPostgresRepository,
  );
};
