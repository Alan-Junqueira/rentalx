import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository"

import { ListCarsUseCase } from "./ListCarsUseCase"

let inMemoryCarsRepository: InMemoryCarsRepository
let sut: ListCarsUseCase

describe("List cars", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    sut = new ListCarsUseCase(inMemoryCarsRepository)
  })

  it('should be able to list all available cars', async () => {
    const car = await inMemoryCarsRepository.create({
      brand: "Car_brand",
      categoryId: "categoryId",
      dailyRate: 140,
      description: "Car description",
      fineAmount: 100,
      licensePlate: "DEF-1212",
      name: "Car1"
    })

    const cars = await sut.execute({})

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by name', async () => {
    const car = await inMemoryCarsRepository.create({
      brand: "Car_brand",
      categoryId: "categoryId",
      dailyRate: 140,
      description: "Car description",
      fineAmount: 100,
      licensePlate: "DEF-1212",
      name: "Car1"
    })

    const cars = await sut.execute({
      name: "Car1"
    })

    expect(cars).toEqual([car])
  })
})