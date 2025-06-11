import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";

export default class ErrorHandleMiddleware {
  public static handleError(
    error: Error,
    _request: Request,
    response: Response,
    _next: NextFunction
  ): void {
    if (error instanceof AppError) {
      response.status(error.statusCode).json({
        type: "error",
        message: error.message,
      });
    }

    response.status(500).json({
      type: "error",
      message: "Internal server error",
    });
  }
}
