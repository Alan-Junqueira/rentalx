import "reflect-metadata"
import * as dotenv from 'dotenv'
import express from "express";
import swaggerUi from "swagger-ui-express";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import "./database";

import './shared/container'

dotenv.config()

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

app.listen(process.env.PORT, () => console.log("Server is running"));
