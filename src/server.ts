import "reflect-metadata"
import * as dotenv from 'dotenv'
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors"
import swaggerUi from "swagger-ui-express";

import { AppError } from "./errors/AppError";
import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

import './shared/container'

dotenv.config()

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

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

app.listen(process.env.PORT, () => console.log("Server is running"));
