import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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