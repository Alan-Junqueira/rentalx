import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import * as redis from "redis";

import { AppError } from "@shared/errors/AppError";

const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
    sessionTimeout: 20,
  },
  legacyMode: true,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "rateLimiter",
  points: 5, // ? Requests quantity
  duration: 5,
});

export const rateLimiter = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await redisClient.connect();

    await limiter.consume(req.ip);

    return next();
  } catch (e) {
    throw new AppError("Too many requests", 429);
  } finally {
    await redisClient.disconnect();
  }
};
