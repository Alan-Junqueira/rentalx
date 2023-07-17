import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface ICreateCarUseCaseRequest {
  name: string
  description: string
  dailyRate: number
  licensePlate: string
  fineAmount: number
  brand: string
  categoryId: string
}

// @injectable()
export class CreateCarUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    brand,
    categoryId,
    dailyRate,
    description,
    fineAmount,
    licensePlate,
    name
  }: ICreateCarUseCaseRequest): Promise<Car> {
    const existentCar = await this.carsRepository.findByLicensePlate(licensePlate)

    if (existentCar) {
      throw new AppError("Car already exists!")
    }

    const car = await this.carsRepository.create({
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name
    })

    return car
  }
}