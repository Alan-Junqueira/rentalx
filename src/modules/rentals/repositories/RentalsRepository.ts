import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { ICreateRentalDTO } from "../dtos/CreateRentalDTO"

export interface IRentalsRepository {
  create(data: ICreateRentalDTO): Promise<Rental>
  findById(id: string): Promise<Rental>
  findByUser(userId: string): Promise<Array<Rental>>
  findOpenRentalByCar(carId: string): Promise<Rental>
  findOpenRentalByUser(userId: string): Promise<Rental>
}