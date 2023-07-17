import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarUseCase } from "./CreateCarUseCase";

export class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name
    } = req.body

    const createCarUseCase = container.resolve(CreateCarUseCase)

    const car = await createCarUseCase.execute({
      brand,
      categoryId,
      dailyRate,
      description,
      fineAmount,
      licensePlate,
      name
    })

    return res.status(201).json(car)
  }
}