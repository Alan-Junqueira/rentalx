import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

import { authConfig } from "@config/auth"
import { UserTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokensRepository"
import { AppError } from "@shared/errors/AppError"


interface IPayload {
  sub: string
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  const userTokensRepository = new UserTokensRepository()

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(token, authConfig.secretRefreshToken) as IPayload

    const user = await userTokensRepository.findByUserIdAndRefreshToken({ refreshToken: token, userId: sub })

    if (!user) {
      throw new AppError("User does not exists", 401)
    }

    req.user = {
      id: sub
    }

    next()
  } catch (error) {
    throw new AppError("Invalid token!", 401)
  }
}