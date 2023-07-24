import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../RentalsRepository";

export class InMemoryRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = []

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    const existentRental = await this.rentals.find(rental => rental.carId === carId && !rental.endDate)

    return existentRental
  }

  async findOpenRentalByUser(userId: any): Promise<Rental> {
    const existentRental = await this.rentals.find(rental => rental.userId === userId && !rental.endDate)

    return existentRental
  }

}