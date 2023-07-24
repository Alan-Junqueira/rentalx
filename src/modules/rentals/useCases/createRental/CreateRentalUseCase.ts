import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/RentalsRepository"
import { AppError } from "@shared/errors/AppError"

dayjs.extend(utc)


interface ICreateRentalUseCaseRequest {
  userId: string
  carId: string
  expectedReturnDate: Date
}

const MINIMUM_HOURS = 24

export class CreateRentalUseCase {

  constructor(
    private rentalsRepository: IRentalsRepository
  ) { }
  async execute({
    carId,
    expectedReturnDate,
    userId
  }: ICreateRentalUseCaseRequest): Promise<Rental> {
    const existentActiveCarRental = await this.rentalsRepository.findOpenRentalByCar(carId)

    if (existentActiveCarRental) {
      throw new AppError("Car is unavailable!")
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(userId)

    if (rentalOpenToUser) {
      throw new AppError("There is a rental in progress for user!")
    }

    const expectedReturnDateFormat = dayjs(expectedReturnDate).utc().local().format()
    const dateNow = dayjs().utc().local().format()
    const dateComparation = dayjs(expectedReturnDateFormat).diff(dateNow, "hours")

    if (dateComparation < MINIMUM_HOURS) {
      throw new AppError("Invalid return time!")
    }

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate
    })

    return rental
  }
}