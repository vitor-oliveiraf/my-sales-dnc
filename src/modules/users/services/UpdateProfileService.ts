import { compare, hash } from "bcrypt";
import AppError from "../../../shared/errors/AppError";
import { usersRepositories } from "../database/repositories/UsersRepositories";
import { User } from "../database/entities/User";

interface IUpdateProfileService {
  user_id: number;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

export default class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfileService): Promise<User> {
    const user = await usersRepositories.findOneBy({ id: user_id });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (email) {
      const userUpdatedEmail = await usersRepositories.findByEmail(email);

      if (userUpdatedEmail) {
        throw new AppError("Email already in use", 400);
      }

      user.email = email;
    }

    if (password && !old_password) {
      throw new AppError("Old password is required to set a new password", 400);
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError("Old password does not match", 400);
      }

      user.password = await hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    await usersRepositories.save(user);

    return user;
  }
}
