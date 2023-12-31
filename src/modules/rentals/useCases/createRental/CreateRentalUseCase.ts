import { inject, injectable } from "tsyringe"

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/RentalsRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/DateProvider"
import { AppError } from "@shared/errors/AppError"

interface ICreateRentalUseCaseRequest {
  userId: string
  carId: string
  expectedReturnDate: Date
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }
  async execute({
    carId,
    expectedReturnDate,
    userId
  }: ICreateRentalUseCaseRequest): Promise<Rental> {
    const MINIMUM_HOURS = 24
    const existentActiveCarRental = await this.rentalsRepository.findOpenRentalByCar(carId)

    if (existentActiveCarRental) {
      throw new AppError("Car is unavailable!")
    }

    // TODO: erro
    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(userId)

    if (rentalOpenToUser) {
      throw new AppError("There is a rental in progress for user!")
    }

    const dateNow = this.dateProvider.dateNow()

    const dateComparation = this.dateProvider.compareInHours(dateNow, expectedReturnDate)
    if (dateComparation < MINIMUM_HOURS) {
      throw new AppError("Invalid return time!")
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate
    })

    await this.carsRepository.updateAvailable({
      available: false,
      id: carId
    })

    return rental
  }
}