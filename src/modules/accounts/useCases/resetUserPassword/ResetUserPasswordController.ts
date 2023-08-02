import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordUseCase } from "./ResetUserPasswordUseCase";

export class ResetUserPasswordController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query
    const { password } = req.body

    const resetUserPasswordUseCase = container.resolve(ResetUserPasswordUseCase)

    await resetUserPasswordUseCase.execute({ password, token: String(token) })

    return res.status(204).send()
  }
}