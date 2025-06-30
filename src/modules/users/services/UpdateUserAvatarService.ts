import AppError from "../../../shared/errors/AppError";
import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import { User } from "../infra/database/entities/User";
import path from "path";
import fs from "fs";
import uploadConfig from "../../../config/upload";

interface IUpdateUserAvatar {
  userId: number;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findOneBy({ id: userId });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      console.log("userAvatarFilePath", userAvatarFilePath);
      await fs.promises.access(userAvatarFilePath);
      await fs.promises.unlink(userAvatarFilePath);
    }

    console.log("avatarFilename", avatarFilename);

    user.avatar = avatarFilename;

    await usersRepositories.save(user);

    return user;
  }
}
