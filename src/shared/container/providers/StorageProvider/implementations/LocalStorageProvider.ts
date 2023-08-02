import fs from 'fs'
import path from 'path'

import { uploadConfig } from '@config/upload';

import { IStorageProvider, IStorageProviderDelete, IStorageProviderSave } from "../IStorageProvider";

export class LocalStorageProvider implements IStorageProvider {
  async delete({ file, folder }: IStorageProviderDelete): Promise<void> {
    const filename = path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file)
    try {
      await fs.promises.stat(filename)
    } catch (error) {
      return
    }

    await fs.promises.unlink(filename)
  }

  async save({ file, folder }: IStorageProviderSave): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(`${uploadConfig.tmpFolder}/${folder}`, file)
    )

    return file
  }
}
