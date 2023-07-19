import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface IFindAvailableRequest {
  brand?: string
  categoryId?: string
  name?: string
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(licensePlate: string): Promise<Car>
  findAvailable({ brand, categoryId, name }: IFindAvailableRequest): Promise<Car[]>
}