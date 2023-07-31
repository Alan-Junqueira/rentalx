import { ICreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../RentalsRepository";

export class InMemoryRentalsRepository implements IRentalsRepository {
  rentals: Rental[] = []

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental()

    Object.assign(rental, {
      ...data,
      startDate: new Date()
    })

    this.rentals.push(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find(rental => rental.id === id)

    return rental
  }

  async findByUser(userId: string): Promise<Rental[]> {
    const rentals = this.rentals.filter(rental => rental.userId === userId)

    return rentals
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    const existentRental = await this.rentals.find(rental => rental.carId === carId && !rental.endDate)

    return existentRental
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const existentRental = await this.rentals.find(rental => rental.userId === userId && !rental.endDate)

    return existentRental
  }
}