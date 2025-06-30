import { userTokensRepositories } from "../infra/database/repositories/UserTokensRepositories";
import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import AppError from "../../../shared/errors/AppError";
import { addHours, isAfter } from "date-fns";
import { hash } from "bcrypt";

interface IResetPassword {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await userTokensRepositories.findByToken(token);
    if (!userToken) {
      throw new AppError("User token not exists", 404);
    }

    const user = await usersRepositories.findById(userToken.user_id);
    if (!user) {
      throw new AppError("User not exists", 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError("Token expired", 401);
    }

    user.password = await hash(password, 8);
    await usersRepositories.save(user);
  }
}
