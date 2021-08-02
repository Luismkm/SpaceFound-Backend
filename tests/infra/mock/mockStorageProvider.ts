import { IStorageProvider } from '@/data/protocols/storageProvider/IStorageProvider';

export const mockStorageProviderStub = (): IStorageProvider => {
  class StorageProviderStub implements IStorageProvider {
    async saveFile(file: string): Promise<string> {
      return Promise.resolve('new_avatar');
    }

    async deleteFile(file: string): Promise<void> {
      return Promise.resolve(null);
    }
  }
  return new StorageProviderStub();
};
