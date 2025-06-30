import Redis from "ioredis";
import { RateLimiterRedis } from "rate-limiter-flexible";
import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

const redisClient = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASSWORD,
});

const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: "ratelimit",
  points: 5, // 10.000 requisições
  duration: 5, // por 60 segundos
  blockDuration: 10, // bloqueia por apenas 1 segundo se exceder
});

export default async function rateLimiter(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  try {
    const clientIP =
      request.ip || request.connection.remoteAddress || "unknown";
    console.log("Rate limiting for IP:", clientIP);
    await limiter.consume(clientIP);
    return next();
  } catch (err) {
    console.log("Rate limit exceeded for IP:", request.ip);
    console.log("Error details:", err);
    throw new AppError("Too many requests", 429);
  }
}
