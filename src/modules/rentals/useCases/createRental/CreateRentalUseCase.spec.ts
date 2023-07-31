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
    const car = await inMemoryCarsRepository.create({
      name: "Test",
      description: "Car test",
      dailyRate: 100,
      licensePlate: "test",
      fineAmount: 40,
      categoryId: "1234",
      brand: "brand"
    })

    const rental = await sut.execute({
      carId: car.id,
      userId: "123456",
      expectedReturnDate: dayAdd24Hours
    })

    expect(rental).toHaveProperty("id")
    expect(rental).toHaveProperty("startDate")
  })

  // it("should not be able to create a new rental, if there is another open rental to same user", async () => {
  //  await  inMemoryRentalsRepository.create({
  //     carId: "1111",
  //     expectedReturnDate: dayAdd24Hours,
  //     userId: "12345"
  //   })

  //   await sut.execute({
  //     carId: "121212",
  //     userId: "12345",
  //     expectedReturnDate: dayAdd24Hours
  //   })

  //   await expect(
  //     sut.execute({
  //       carId: "121212",
  //       userId: "12345",
  //       expectedReturnDate: dayAdd24Hours
  //     })

  //   ).rejects.toEqual(new AppError("There is a rental in progress for user!"))
  // })

  // it("should not be able to create a new rental, if there is another open rental to same car", async () => {
  //  const rental = await inMemoryRentalsRepository.create({
  //     carId: "test",
  //     expectedReturnDate: dayAdd24Hours,
  //     userId: "12345"
  //   })

  //   await sut.execute({
  //     carId: "test",
  //     userId: "123",
  //     expectedReturnDate: dayAdd24Hours
  //   })

  //   await expect(sut.execute({
  //     carId: "12345",
  //     userId: "321",
  //     expectedReturnDate: dayAdd24Hours
  //   })
  //   ).rejects.toEqual(new AppError("Car is unavailable!"))
  // })

  it("should not be able to create a new rental, with invalid returning time", async () => {
    await expect(sut.execute({
      carId: "12345",
      userId: "321",
      expectedReturnDate: dayjs().toDate()
    })

    ).rejects.toEqual(new AppError("Invalid return time!"))
  })
})