import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { authConfig } from "@config/auth";
import { IUserTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/DateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string
  email: string
}

interface IRefreshTokenUseCase {
  token: string
  refreshToken: string
}

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) { }

  async execute(refreshToken: string): Promise<IRefreshTokenUseCase> {
    const { email, sub } = verify(refreshToken, authConfig.secretRefreshToken) as IPayload

    const userId = sub

    const userToken = await this.userTokensRepository.findByUserIdAndRefreshToken({ userId, refreshToken })

    if (!userToken) {
      throw new AppError("Refresh Token does't exists!")
    }

    await this.userTokensRepository.deleteById(userToken.id)

    const newRefreshToken = sign({ email }, authConfig.secretRefreshToken, {
      subject: userId,
      expiresIn: authConfig.expiresInRefreshToken
    })

    const refreshTokenExpiresDate = this.dayjsDateProvider.addDays(authConfig.expiresRefreshTokenDays)

    await this.userTokensRepository.create({
      expiresDate: refreshTokenExpiresDate,
      refreshToken: newRefreshToken,
      userId
    })

    const newToken = sign({}, authConfig.secretToken, {
      subject: userId,
      expiresIn: authConfig.expiresInToken
    })

    return {
      token: newToken,
      refreshToken: newRefreshToken
    }
  }
}