import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository"

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let inMemoryCarsRepository: InMemoryCarsRepository
let sut: ListAvailableCarsUseCase

describe("List cars", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    sut = new ListAvailableCarsUseCase(inMemoryCarsRepository)
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

  it('should be able to list all available cars by brand', async () => {
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
      brand: "Car_brand"
    })

    expect(cars).toEqual([car])
  })

  it('should be able to list all available cars by category', async () => {
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
      categoryId: "categoryId"
    })

    expect(cars).toEqual([car])
  })
})