import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";


@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    driverLicense,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const existentUser = await this.usersRepository.findByEmail(email)

    if (existentUser) {
      throw new AppError("User already exists")
    }

    const passwordHash = await hash(password, 8)

    await this.usersRepository.create({
      driverLicense,
      email,
      name,
      password: passwordHash,
    })
  }
}