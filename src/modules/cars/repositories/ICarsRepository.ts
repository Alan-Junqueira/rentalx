import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

export interface IFindAvailableRequest {
  brand?: string
  categoryId?: string
  name?: string
}

export interface IUpdateAvailableRequest {
  id: string
  available: boolean
}

export interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>
  findByLicensePlate(licensePlate: string): Promise<Car>
  findAvailable({ brand, categoryId, name }: IFindAvailableRequest): Promise<Car[]>
  findById(id: string): Promise<Car>
  updateAvailable(data: IUpdateAvailableRequest): Promise<void>
}