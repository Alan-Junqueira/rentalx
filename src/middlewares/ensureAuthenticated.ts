import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

import { AppError } from "../errors/AppError"
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

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
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

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