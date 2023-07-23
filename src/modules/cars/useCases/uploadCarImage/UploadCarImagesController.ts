import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadCarImageUseCase } from "./UploadCarImageUseCase";

interface IFiles {
  filename: string
}

export class UploadCarImagesController {

  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const images = req.files as Array<IFiles>

    const uploadCarImagesUseCase = container.resolve(UploadCarImageUseCase)

    const imagesName = images.map(file => file.filename)

    await uploadCarImagesUseCase.execute({
      carId: id,
      imagesName
    })

    return res.status(201).send()
  }
} 