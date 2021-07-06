import express, { Request, Response, NextFunction } from "express";
import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import { errors } from "celebrate";
import { isBoom } from '@hapi/boom';

import swaggerUI from "swagger-ui-express";

import "@shared/infra/typeorm";
import "@shared/container";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";
import { routeAliases } from "@shared/infra/http/middlewares";

const app = express();

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use(routeAliases);

app.use(router);

app.use(errors());

app.use(
  async (
    error: Error,
    _: Request,
    response: Response,
    next: NextFunction
  ) => {
    if (isBoom(error)) {
      const { statusCode, payload } = error.output;

      return response.status(statusCode).json({
        ...payload,
        ...error.data,
        // docs: process.env.DOCS_URL,
      });
    }

    return next(error);
  }
);

export { app };
