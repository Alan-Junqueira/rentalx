import { inject, injectable } from "tsyringe";

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
    await this.usersRepository.create({
      driverLicense,
      email,
      name,
      password,
    })
  }
}