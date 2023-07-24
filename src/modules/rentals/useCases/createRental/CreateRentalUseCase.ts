import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/RentalsRepository"
import { AppError } from "@shared/errors/AppError"

interface ICreateRentalUseCaseRequest {
  userId: string
  carId: string
  expectedReturnDate: Date
}

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

    const rental = await this.rentalsRepository.create({
      userId,
      carId,
      expectedReturnDate
    })

    return rental
  }
}