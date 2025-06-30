import { Request, Response } from "express";
import CreateUserService from "../../../services/CreateUserService";
import ListUsersService from "../../../services/ListUsersService";
import { instanceToInstance } from "class-transformer";

export default class UsersControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, avatar } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
      avatar,
    });
    return response.json(instanceToInstance(user));
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService();
    const users = await listUsers.execute();
    return response.json(instanceToInstance(users));
  }
}
