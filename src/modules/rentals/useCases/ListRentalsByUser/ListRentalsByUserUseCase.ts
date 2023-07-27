import { inject, injectable } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/RentalsRepository";

@injectable()
export class ListRentalsByUserUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalsRepository: IRentalsRepository
  ) { }

  async execute(userId: string): Promise<Array<Rental>> {
    const rentalsByUser = this.rentalsRepository.findByUser(userId)

    return rentalsByUser
  }
}