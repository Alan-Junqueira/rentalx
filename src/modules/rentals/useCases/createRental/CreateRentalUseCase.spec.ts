import dayjs from "dayjs"

import { InMemoryCarsRepository } from "@modules/cars/repositories/in-memory/InMemoryCarsRepository"
import { InMemoryRentalsRepository } from "@modules/rentals/repositories/in-memory/InMemoryRentalsRepository"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"

import { CreateRentalUseCase } from "./CreateRentalUseCase"


let inMemoryRentalsRepository: InMemoryRentalsRepository
let inMemoryCarsRepository: InMemoryCarsRepository
let dayjsDateProvider: DayjsDateProvider
let sut: CreateRentalUseCase

describe("Create rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate()

  beforeEach(() => {
    inMemoryRentalsRepository = new InMemoryRentalsRepository()
    inMemoryCarsRepository = new InMemoryCarsRepository()
    dayjsDateProvider = new DayjsDateProvider()
    sut = new CreateRentalUseCase(inMemoryRentalsRepository, dayjsDateProvider, inMemoryCarsRepository)
  })

  it("should be able to create a new rental", async () => {
    const rental = await sut.execute({
      carId: "12345",
      userId: "123456",
      expectedReturnDate: dayAdd24Hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("startDate")
  })

  it("should not be able to create a new rental, if there is another open rental to same user", async () => {
    await sut.execute({
      carId: "123",
      userId: "123456",
      expectedReturnDate: dayAdd24Hours
    })

    expect(async () => {
      await sut.execute({
        carId: "321",
        userId: "123456",
        expectedReturnDate: dayAdd24Hours
      })
    }
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental, if there is another open rental to same car", async () => {
    await sut.execute({
      carId: "12345",
      userId: "123",
      expectedReturnDate: dayAdd24Hours
    })

    expect(async () => {
      await sut.execute({
        carId: "12345",
        userId: "321",
        expectedReturnDate: dayAdd24Hours
      })
    }
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new rental, with invalid returning time", async () => {
    expect(async () => {
      await sut.execute({
        carId: "12345",
        userId: "321",
        expectedReturnDate: dayjs().toDate()
      })
    }
    ).rejects.toBeInstanceOf(AppError)
  })
})