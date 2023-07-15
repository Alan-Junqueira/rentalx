import dotenv from "dotenv"

import { AppError } from "@errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository"

import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

dotenv.config()

let inMemoryUsersRepository: InMemoryUsersRepository
let createUserUseCase: CreateUserUseCase
let sut: AuthenticateUserUseCase

describe("Authenticate User", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    sut = new AuthenticateUserUseCase(inMemoryUsersRepository)
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

  it("Should not be able to authenticate an inexistent user", () => {
    expect(async () => {
      await sut.execute({
        email: "false@email.com",
        password: "false"
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it("Should not be able to authenticate with incorrect password", () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driverLicense: "00123",
        email: "teste@email.com",
        name: "User",
        password: "correct"
      }

      await createUserUseCase.execute(user)

      await sut.execute({
        email: user.email,
        password: "wrong"
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})