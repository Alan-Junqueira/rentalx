import "reflect-metadata"
import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import swaggerUi from "swagger-ui-express";

import { uploadConfig } from "@config/upload";
import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

import '@shared/container'

dotenv.config()

createConnection('localhost')
const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use('/avatar', express.static(`${uploadConfig.tmpFolder}/avatar`))
app.use('/cars', express.static(`${uploadConfig.tmpFolder}/cars`))

app.use(router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

export { app }