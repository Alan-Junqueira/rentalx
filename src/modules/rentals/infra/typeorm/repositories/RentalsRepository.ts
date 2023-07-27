import { Repository, getRepository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/CreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/RentalsRepository";

import { Rental } from "../entities/Rental";

export class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }
  async create(data: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      ...data
    })

    await this.repository.save(rental)

    return rental
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne(id)

    return rental
  }

  async findOpenRentalByCar(carId: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        carId,
        endDate: null
      }
    })

    return rental
  }

  async findOpenRentalByUser(userId: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: {
        userId,
        endDate: null
      }
    })

    return rental
  }
}