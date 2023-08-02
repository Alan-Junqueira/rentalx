export interface IStorageProviderSave {
  file: string
  folder: string
}

export interface IStorageProviderDelete {
  file: string
  folder: string
}

export interface IStorageProvider {
  delete(data: IStorageProviderDelete): Promise<void>
  save(data: IStorageProviderSave): Promise<string>
}