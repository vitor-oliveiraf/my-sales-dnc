import { Request, Response } from "express";
import UpdateUserAvatarService from "../services/UpdateUserAvatarService";

export default class UpdateUserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatar = new UpdateUserAvatarService();
    const user = await updateUserAvatar.execute({
      userId: Number(request.user.id),
      avatarFilename: String(request.file?.filename || ""),
    });
    return response.json(user);
  }
}
