import { inject, injectable } from "tsyringe"

import { ICarImagesRepository } from "@modules/cars/repositories/CarImagesRepository"
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider"

interface IUploadCarImageUseCase {
  carId: string
  imagesName: Array<string>
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute({
    carId,
    imagesName
  }: IUploadCarImageUseCase): Promise<void> {
    imagesName.map(async image => {
      await this.carImagesRepository.create(carId, image)
      await this.storageProvider.save({
        file: image,
        folder: 'cars'
      })
    })
  }
}