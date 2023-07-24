import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

export class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { expectedReturnDate, carId } = req.body
    const { id } = req.user

    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental = await createRentalUseCase.execute({
      carId,
      expectedReturnDate,
      userId: id
    })

    return res.status(201).json(rental)
  }
}