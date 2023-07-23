import { Repository, getRepository } from "typeorm";

import { ICarImagesRepository } from "@modules/cars/repositories/CarImagesRepository";

import { CarImage } from "../entities/CarImage";

export class CarImagesRepository implements ICarImagesRepository {
  private repository: Repository<CarImage>

  constructor(
  ) {
    this.repository = getRepository(CarImage)
  }

  async create(id: string, imageName: string): Promise<CarImage> {
    const carImage = this.repository.create({
      carId: id,
      imageName
    })

    await this.repository.save(carImage)

    return carImage
  }
}