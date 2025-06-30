import { Request, Response } from "express";
import SessionUserService from "../../../services/SessionUserService";

export default class SessionsControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const sessionUser = new SessionUserService();
    const sessionUserResponse = await sessionUser.execute({ email, password });
    return response.json(sessionUserResponse);
  }
}
