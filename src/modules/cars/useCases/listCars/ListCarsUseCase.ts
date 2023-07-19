import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

interface IListCarsUseCaseRequest {
  categoryId?: string
  brand?: string
  name?: string
}

export class ListCarsUseCase {
  constructor(
    private carsRepository: ICarsRepository
  ) { }
  async execute({
    brand,
    categoryId,
    name
  }: IListCarsUseCaseRequest): Promise<Car[]> {
    const cars = this.carsRepository.findAvailable({
      brand,
      categoryId,
      name
    })

    return cars
  }
}