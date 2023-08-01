import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

import { authConfig } from "@config/auth"
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository"
import { AppError } from "@shared/errors/AppError"


interface IPayload {
  sub: string
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("Token missing", 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(token, authConfig.secretToken) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(sub)

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