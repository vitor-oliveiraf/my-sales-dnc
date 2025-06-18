import AppError from "../../../shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories";

interface IShowProfileService {
  user_id: number;
}

export default class ShowProfileService {
  public async execute({ user_id }: IShowProfileService) {
    const user = await usersRepositories.findOneBy({ id: user_id });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return user;
  }
}
