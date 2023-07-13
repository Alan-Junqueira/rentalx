import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository"

interface IPayload {
  sub: string
}

export const ensureAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new Error("Token missing")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(sub)

    if(!user){
      throw new Error("User does not exists")
    }

    next()
  } catch (error) {
    throw new Error("Invalid token!")
  }
}