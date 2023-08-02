import dotenv from "dotenv"

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryUserTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUserTokensRepository"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { AppError } from "@shared/errors/AppError"

import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

dotenv.config()

let inMemoryUsersRepository: InMemoryUsersRepository
let inMemoryUserTokensRepository: InMemoryUserTokensRepository
let createUserUseCase: CreateUserUseCase
let dateProvider: DayjsDateProvider
let sut: AuthenticateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    inMemoryUserTokensRepository = new InMemoryUserTokensRepository()
    dateProvider = new DayjsDateProvider()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository, inMemoryUserTokensRepository, dateProvider)
  })

  it("Should be able to authenticate a user", async () => {
    const user: ICreateUserDTO = {
      driverLicense: "00123",
      email: "teste@email.com",
      name: "User",
      password: "1234"
    }

    await createUserUseCase.execute(user)

    const result = await sut.execute({
      email: user.email,
      password: user.password
    })

    expect(result).toHaveProperty("token")
  })

  it("Should not be able to authenticate an inexistent user", async () => {
    await expect(
      sut.execute({
        email: "false@email.com",
        password: "false"
      })
    ).rejects.toEqual(new AppError("Email or password invalid!"))
  })

  it("Should not be able to authenticate with incorrect password", async () => {
    const user: ICreateUserDTO = {
      driverLicense: "00123",
      email: "teste@email.com",
      name: "User",
      password: "correct"
    }

    await createUserUseCase.execute(user)
    await expect(
      sut.execute({
        email: user.email,
        password: "wrong"
      })
    ).rejects.toEqual(new AppError("Email or password invalid!"))
  })
})