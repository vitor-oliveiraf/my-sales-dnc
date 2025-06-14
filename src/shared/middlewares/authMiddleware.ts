import AppError from "../errors/AppError";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class AuthMiddleware {
  public static execute(
    request: Request,
    _response: Response,
    next: NextFunction
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("Token não encontrado", 401);
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = verify(token, process.env.JWT_SECRET as Secret);

      const { sub } = decoded as ITokenPayload;

      request.user = { id: sub };

      return next();
    } catch (error) {
      throw new AppError("Token inválido", 401);
    }
  }
}
