import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserUseCase } from "./CreateUserUseCase";


export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      username,
      email,
      password,
      driverLicense
    } = req.body

    const createUserUseCase = container.resolve(CreateUserUseCase)

    await createUserUseCase.execute({
      name,
      username,
      email,
      password,
      driverLicense
    })

    return res.status(201).send();
  }
}