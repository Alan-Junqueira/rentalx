import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository"

import { CreateRentalUseCase } from "./CreateRentalUseCase"

let inMemoryRentalsRepository: InMemoryRentalsRepository
let sut: CreateRentalUseCase

describe("Create rental", () => {
  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository()
    sut = new CreateRentalUseCase(inMemoryRentalsRepository)
  })

  it("should be able to create a new rental", async () => {
    await sut.execute({
      carId: "12345",
      userId: "123456",
      expectedReturnDate: new Date()
    })
  })
})