import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository"
import { AppError } from "@shared/errors/AppError"

import { CreateCarUseCase } from "./CreateCarUseCase"

let carsRepository: ICarsRepository
let sut: CreateCarUseCase

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository()
    sut = new CreateCarUseCase(carsRepository)
  })

  it("should be able to create a new car", async () => {
    const car = await sut.execute({
      brand: "Brand",
      categoryId: "Category",
      dailyRate: 100,
      description: "Description car",
      fineAmount: 60,
      licensePlate: "ABC-1234",
      name: "Name car"
    })

    expect(car).toHaveProperty("id")
  })

  it("should not be able to create a new car with existent license plate", async () => {
    expect(async () => {
      await sut.execute({
        brand: "Brand",
        categoryId: "Category",
        dailyRate: 100,
        description: "Description car",
        fineAmount: 60,
        licensePlate: "ABC-1234",
        name: "Car 1"
      })
      await sut.execute({
        brand: "Brand",
        categoryId: "Category",
        dailyRate: 100,
        description: "Description car",
        fineAmount: 60,
        licensePlate: "ABC-1234",
        name: "Car 2"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to create a new car with available tru, by default", async () => {
    const car = await sut.execute({
      brand: "Brand",
      categoryId: "Category",
      dailyRate: 100,
      description: "Description car",
      fineAmount: 60,
      licensePlate: "ABC-1234",
      name: "Car available"
    })

    expect(car.available).toBeTruthy()
  })
})