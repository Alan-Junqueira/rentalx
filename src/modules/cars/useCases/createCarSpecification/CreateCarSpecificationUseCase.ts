import { inject, injectable } from "tsyringe"

import { Car } from "@modules/cars/infra/typeorm/entities/Car"
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository"
import { AppError } from "@shared/errors/AppError"

interface ICreateCarSpecificationUseCaseRequest {
  carId: string
  specificationsId: Array<string>
}
@injectable()
export class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { }

  async execute({
    carId,
    specificationsId
  }: ICreateCarSpecificationUseCaseRequest): Promise<Car> {
    const existentCar = await this.carsRepository.findById(carId)

    if (!existentCar) {
      throw new AppError("Car does not exists")
    }

    const specifications = await this.specificationsRepository.findByIds(specificationsId)

    existentCar.specifications = specifications

    await this.carsRepository.create(existentCar)

    return existentCar
  }
}