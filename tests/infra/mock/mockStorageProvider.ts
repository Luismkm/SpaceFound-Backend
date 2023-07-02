import { IStorageProvider } from '@/data/protocols/storageProvider/IStorageProvider';

export class StorageProviderSpy implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    return Promise.resolve('new_url');
  }

  async deleteFile(file: string): Promise<void> {
    return Promise.resolve();
  }
}
