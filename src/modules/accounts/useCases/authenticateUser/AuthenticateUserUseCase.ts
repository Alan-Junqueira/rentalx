import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe"

import { authConfig } from "@config/auth"
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository"
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/DateProvider"
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
  refreshToken: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UserTokensRepository")
    private usersTokenRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
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
    
    const token = sign({}, authConfig.secretToken, {
      subject: user.id,
      expiresIn: authConfig.expiresInToken
    })

    const refreshToken = sign({ email }, authConfig.secretRefreshToken, {
      subject: user.id,
      expiresIn: authConfig.expiresInRefreshToken
    })

    const refreshTokenExpiresDate = this.dayjsDateProvider.addDays(authConfig.expiresRefreshTokenDays)

    await this.usersTokenRepository.create({
      expiresDate: refreshTokenExpiresDate,
      refreshToken,
      userId: user.id
    })

    return {
      user: {
        name: user.email,
        email: user.email
      },
      token,
      refreshToken
    }
  }
}