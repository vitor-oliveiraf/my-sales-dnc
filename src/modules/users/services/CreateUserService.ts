import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import { User } from "../infra/database/entities/User";
import { hash } from "bcrypt";
import AppError from "../../../shared/errors/AppError";

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export default class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: ICreateUser): Promise<User> {
    const emailExists = await usersRepositories.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email já está em uso.", 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepositories.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await usersRepositories.save(user);

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as User;
  }
}
