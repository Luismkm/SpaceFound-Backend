import fs from 'fs';
import path from 'path';

import { DiskStorageProvider } from '@/infra/storageProvider/DiskStorageProvider';

import uploadConfig from '@/main/config/upload';
import { throwError } from '@/tests/domain/mocks';

jest.mock('path', () => ({
  resolve(file: string): string {
    return 'any_path';
  },
}));

jest.mock('fs', () => ({
  promises: {
    unlink: jest.fn().mockResolvedValue(Promise.resolve()),
  },
  mkdirSync: jest.fn(),
}));

const makeSut = (): DiskStorageProvider => new DiskStorageProvider();

describe('DiskStorageProvider', () => {
  it('should delete call path.resolve with correct value', () => {
    const sut = makeSut();
    const pathSpy = jest.spyOn(path, 'resolve');
    sut.deleteFile('any_file')
    expect(pathSpy).toHaveBeenCalledWith(uploadConfig.uploadsFolder, 'any_file')
  });

  it('should delete call fs.promises.unlink with correct value', async () => {
    const sut = makeSut();
    const unlinkSpy = jest.spyOn(fs.promises, 'unlink');
    await sut.deleteFile('any_file')
    expect(unlinkSpy).toHaveBeenCalledWith('any_path');
  });

  it('Should throw if DiskStorageProvider throws', async () => {
    const sut = makeSut();
    jest.spyOn(fs.promises, 'unlink').mockImplementationOnce(() => { throw new Error(); });
    const promise = sut.deleteFile('any_file');
    await expect(promise).rejects.toThrow();
  });
});
