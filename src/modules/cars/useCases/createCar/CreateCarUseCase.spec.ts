import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"
import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository"

import { CreateCarUseCase } from "./CreateCarUseCase"

let carsRepository: ICarsRepository
let sut: CreateCarUseCase

describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new InMemoryCarsRepository()
    sut = new CreateCarUseCase(carsRepository)
  })

  it("should be able to create a new car", async () => {
    await sut.execute({
      brand: "Brand",
      categoryId: "Category",
      dailyRate: 100,
      description: "Description car",
      fineAmount: 60,
      licensePlate: "ABC-1234",
      name: "Name car"
    })
  })
})