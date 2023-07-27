import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

export class DevolutionRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params

    const { id: userId } = req.user

    const devolutionRentalUseCase = container.resolve(DevolutionRentalUseCase)

    const rental = await devolutionRentalUseCase.execute({
      id,
      userId
    })

    return res.status(200).json(rental)
  }
}