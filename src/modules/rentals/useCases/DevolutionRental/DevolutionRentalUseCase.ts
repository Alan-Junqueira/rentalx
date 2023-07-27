import { inject, injectable } from "tsyringe"

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "@modules/rentals/repositories/RentalsRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/DateProvider"
import { AppError } from "@shared/errors/AppError"

interface IDevolutionUseCaseRequest {
  id: string
  userId: string
}

@injectable()
export class DevolutionUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository,
    @inject("CarsRepository")
    private carsRepository: ICarsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ id, userId }: IDevolutionUseCaseRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById(id)
    const car = await this.carsRepository.findById(id)
    const minimumDaily = 1

    if (!rental) {
      throw new AppError("Rental doesn't exists!")
    }

    const dateNow = this.dateProvider.dateNow()

    let daily = this.dateProvider.compareInDays(rental.startDate, this.dateProvider.dateNow())

    if (daily <= 0) {
      daily = minimumDaily
    }

    const delay = this.dateProvider.compareInDays(dateNow, rental.expectedReturnDate)

    let total = 0

    if (delay > 0) {
      const calculateFine = delay * car.fineAmount
      total = calculateFine
    }

    total += daily * car.dailyRate

    rental.endDate = this.dateProvider.dateNow()
    rental.total = total

    await Promise.all([
      this.rentalsRepository.create(rental),
      this.carsRepository.updateAvailable({ available: true, id: car.id })
    ])

    return rental
  }
}
