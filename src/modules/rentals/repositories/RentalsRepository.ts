import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { ICreateRentalDTO } from "../dtos/CreateRentalDTO"

export interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental>
  findOpenRentalByUser(userId: string): Promise<Rental>
  create(data: ICreateRentalDTO): Promise<Rental>
}