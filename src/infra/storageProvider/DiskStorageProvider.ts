import fs from 'fs';
import path from 'path';

import uploadConfig from '@/main/config/upload';

import { ISaveFile } from '@/data/protocols/storageProvider/ISaveFile';
import { IDeleteFile } from '@/data/protocols/storageProvider/IDeleteFile';

export class DiskStorageProvider implements ISaveFile, IDeleteFile {
  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }

  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }
}
