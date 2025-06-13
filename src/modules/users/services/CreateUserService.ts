import { usersRepository } from "../routes/UsersRepositories";
import { User } from "../database/entities/User";
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
    const emailExists = await usersRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError("Email já está em uso.", 409);
    }

    const hashedPassword = await hash(password, 10);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      avatar,
    });

    await usersRepository.save(user);

    return user;
  }
}
