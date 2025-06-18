import { Request, Response } from "express";
import UpdateProfileService from "../services/UpdateProfileService";
import ShowProfileService from "../services/ShowProfileService";

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.user.id);
    const { name, email, password, old_password } = request.body;

    const updateProfile = new UpdateProfileService();

    const user = await updateProfile.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = Number(request.user.id);

    const showProfile = new ShowProfileService();

    const user = await showProfile.execute({ user_id });

    return response.json(user);
  }
}
