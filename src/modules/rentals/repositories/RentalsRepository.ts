import { Rental } from "../infra/typeorm/entities/Rental"

export interface IRentalsRepository {
  findOpenRentalByCar(carId: string): Promise<Rental>
  findOpenRentalByUser(userId): Promise<Rental>
}