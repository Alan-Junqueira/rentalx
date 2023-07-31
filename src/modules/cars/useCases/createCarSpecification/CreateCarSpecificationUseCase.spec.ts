import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository"
import { InMemorySpecificationsRepository } from "@modules/cars/repositories/in-memory/InMemorySpecificationsRepository"
import { AppError } from "@shared/errors/AppError"

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let inMemoryCarsRepository: InMemoryCarsRepository
let inMemorySpecificationsRepository: InMemorySpecificationsRepository
let sut: CreateCarSpecificationUseCase

describe("Create car specification", () => {
  beforeEach(() => {
    inMemoryCarsRepository = new InMemoryCarsRepository()
    inMemorySpecificationsRepository = new InMemorySpecificationsRepository()
    sut = new CreateCarSpecificationUseCase(inMemoryCarsRepository, inMemorySpecificationsRepository)
  })

  it("should not be able to add a new specification to a inexistent car", async () => {
    const carId = "1234"
    const specificationsId = ["54321"]

    await expect(
      sut.execute({ carId, specificationsId })
    ).rejects.toEqual(new AppError("Car does not exists!"))
  })

  it("should be able to add a new specification car", async () => {
    const car = await inMemoryCarsRepository.create({
      brand: "Brand",
      categoryId: "Category",
      dailyRate: 100,
      description: "Description car",
      fineAmount: 60,
      licensePlate: "ABC-1234",
      name: "Name car"
    })

    const specification = await inMemorySpecificationsRepository.create({
      description: "test",
      name: "test"
    })

    const specificationsId = [specification.id]

    const specificationsCars = await sut.execute({ carId: car.id, specificationsId })

    expect(specificationsCars).toHaveProperty("specifications")
    expect(specificationsCars.specifications.length).toBe(1)
  })
})