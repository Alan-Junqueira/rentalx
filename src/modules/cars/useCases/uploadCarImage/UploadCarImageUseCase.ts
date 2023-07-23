import { inject, injectable } from "tsyringe"

import { ICarImagesRepository } from "@modules/cars/repositories/CarImagesRepository"

interface IUploadCarImageUseCase {
  carId: string
  imagesName: Array<string>
}

@injectable()
export class UploadCarImageUseCase {
  constructor(
    @inject("CarImagesRepository")
    private carImagesRepository: ICarImagesRepository
  ) { }

  async execute({
    carId,
    imagesName
  }: IUploadCarImageUseCase): Promise<void> {
    imagesName.map(async image => {
      await this.carImagesRepository.create(carId, image)
    })
  }
}