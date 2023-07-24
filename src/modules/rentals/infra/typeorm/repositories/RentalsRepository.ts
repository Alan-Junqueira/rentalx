import { Repository, getRepository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/RentalsRepository";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = await this.repository.create({
      ...data
    })

    return rental
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      carId
    })

    return rental
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      userId
    })

    await this.repository.save(rental)

    return rental
  }
}