import { usersRepositories } from "../database/repositories/UsersRepositories";
import { User } from "../database/entities/User";
import AppError from "../../../shared/errors/AppError";
import { compare } from "bcrypt";
import { Secret, sign } from "jsonwebtoken";

interface ISessionUser {
  email: string;
  password: string;
}

interface ISessionResponse {
  user: User;
  token: string;
}

export default class SessionUserService {
  public async execute({
    email,
    password,
  }: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha incorretos", 401);
    }

    const token = sign(
      { email: user.email },
      process.env.JWT_SECRET as Secret,
      {
        subject: user.id.toString(),
        expiresIn: "1d",
      }
    );

    return { user, token };
  }
}
