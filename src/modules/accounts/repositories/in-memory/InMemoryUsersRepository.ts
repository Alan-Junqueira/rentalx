import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { User } from "@modules/accounts/infra/typeorm/entities/User"

import { IUsersRepository } from "../IUsersRepository"

export class InMemoryUsersRepository implements IUsersRepository {
  users: User[] = []

  async create({
    driverLicense,
    email,
    name,
    password
  }: ICreateUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      driverLicense,
      email,
      name,
      password
    })

    this.users.push(user)
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)

    return user
  }
  async findById(id: string): Promise<User> {
    const user = this.users.find(user => user.id === id)

    return user
  }

}