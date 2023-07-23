import { CarImage } from "../infra/typeorm/entities/CarImage";

export interface ICarImagesRepository {
  create(id: string, imageName: string): Promise<CarImage>
}