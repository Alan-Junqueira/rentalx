import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { AppError } from "@shared/errors/AppError"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  },
  token: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Email or password invalid!")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new AppError("Email or password invalid!")
    }

    const token = sign({}, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "1d"
    })

    return {
      user: {
        name: user.email,
        email: user.email
      },
      token
    }
  }
}