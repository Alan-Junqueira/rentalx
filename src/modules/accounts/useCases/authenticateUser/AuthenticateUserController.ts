import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";


export class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body

    const authenticateUseCase = container.resolve(AuthenticateUserUseCase)

    const token = await authenticateUseCase.execute({
      password, email
    })

    return res.json(token)
  }
}