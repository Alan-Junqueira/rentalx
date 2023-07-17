import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository } from "../ICarsRepository";

export class InMemoryCarsRepository implements ICarsRepository {
  cars: Car[] = []
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car()
    
    Object.assign(car, {
      ...data
    })
    
    this.cars.push(car)

    return car
  }
  
  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.cars.find(car => car.licensePlate === licensePlate)

    return car
  }
}