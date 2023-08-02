import { jest } from '@jest/globals'
import { InMemoryUsersRepository } from "@modules/accounts/repositories/in-memory/InMemoryUsersRepository"
import { InMemoryUserTokensRepository } from "@modules/accounts/repositories/in-memory/InMemoryUserTokensRepository"
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider"
import { InMemoryMailProvider } from "@shared/container/providers/MailProvider/in-memory/InMemoryMailProvider"
import { AppError } from '@shared/errors/AppError'

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let inMemoryUsersRepository: InMemoryUsersRepository
let dateProvider: DayjsDateProvider
let mailProvider: InMemoryMailProvider
let inMemoryUserTokensRepository: InMemoryUserTokensRepository
let sut: SendForgotPasswordMailUseCase

describe("Send Forgot Email", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    dateProvider = new DayjsDateProvider()
    mailProvider = new InMemoryMailProvider()
    inMemoryUserTokensRepository = new InMemoryUserTokensRepository()
    sut = new SendForgotPasswordMailUseCase(
      inMemoryUsersRepository,
      inMemoryUserTokensRepository,
      dateProvider,
      mailProvider
    )
  })

  it("should be able to send a forgot email to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail")

    await inMemoryUsersRepository.create({
      driverLicense: "575309",
      email: "jijaj@vi.co.uk",
      name: "Ola Zimmerman",
      password: "1234"
    })

    await sut.execute('jijaj@vi.co.uk')

    expect(sendMail).toHaveBeenCalled()
  })

  it("should not be able to send an email if user doesn't exists", async () => {
    await expect(async () => {
      await sut.execute('jijaj@vi.co.uk')
    }).rejects.toEqual(new AppError("User doesn't exists!"))
  })

  it("should not be able to create an user token", async () => {
    const generateTokenMail = jest.spyOn(inMemoryUsersRepository, "create")

    inMemoryUsersRepository.create({
      driverLicense: "668803",
      email: "gon@una.vn",
      name: "Miguel Barnett",
      password: "1234"
    })

    await sut.execute('gon@una.vn')

    expect(generateTokenMail).toBeCalled()
  })
})