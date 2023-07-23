import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarsRepository, IFindAvailableRequest } from "../ICarsRepository";

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

  async findAvailable({
    brand,
    categoryId,
    name
  }: IFindAvailableRequest): Promise<Car[]> {
    const cars = this.cars
      .filter(car => car.available || ((brand && car.brand === brand) || (categoryId && car.categoryId === categoryId) || (name && car.name === name)))

    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await this.cars.find(car => car.id === id)

    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.cars.find(car => car.licensePlate === licensePlate)

    return car
  }
}