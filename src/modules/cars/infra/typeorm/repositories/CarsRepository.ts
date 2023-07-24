import { Repository, getRepository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository, IFindAvailableRequest } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

export class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car)
  }
  
  async create(data: ICreateCarDTO): Promise<Car> {
    const car = await this.repository.create({
      ...data
    })

    await this.repository.save(car)

    return car
  }

  async findAvailable({ brand, categoryId, name }: IFindAvailableRequest): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("available = :available", { available: true })

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand })
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name })
    }

    if (categoryId) {
      carsQuery.andWhere("categoryId = :categoryId", { categoryId })
    }

    const cars = await carsQuery.getMany()

    return cars
  }

  async findById(id: string): Promise<Car> {
    const car = await this.repository.findOne(id)

    return car
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      licensePlate
    })

    return car
  }

}