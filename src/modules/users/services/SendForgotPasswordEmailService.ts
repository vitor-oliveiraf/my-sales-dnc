import { usersRepositories } from "../infra/database/repositories/UsersRepositories";
import { userTokensRepositories } from "../infra/database/repositories/UserTokensRepositories";
import AppError from "../../../shared/errors/AppError";
import { sendEmail } from "../../../config/email";

interface IForgotPasswordEmail {
  email: string;
}

export default class SendForgotPasswordEmailService {
  public async execute({ email }: IForgotPasswordEmail): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    const token = await userTokensRepositories.generate(user.id);

    sendEmail({
      to: email,
      subject: "Recuperação de senha",
      body: `
            <div style="font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.6; color: #222; max-width: 600px;">
              <h1 style="margin-top: 40px; font-size: 22px; line-height: 22px; color: #111;">
                Recuperação de senha
              </h1>
              <p style="margin-top: 20px; font-size: 16px; line-height: 24px; color: #666;">
                Olá ${user.name},
              </p>
              <p style="margin-top: 20px; font-size: 16px; line-height: 24px; color: #666;">
                Recebemos uma solicitação para resetar a senha da sua conta.
                Utilize o token abaixo para resetar a senha:
              </p>
              <p style="margin-top: 20px; font-size: 16px; line-height: 24px; color: #666;">
                ${token?.token}
              </p>
              <p style="margin-top: 20px; font-size: 16px; line-height: 24px; color: #666;">
                Caso não tenha sido você, ignore este email.
              </p>
              <p style="margin-top: 20px; font-size: 16px; line-height: 24px; color: #666;">
                Obrigado!
              </p>
              <p style="margin-top: 20px; font-size: 16px; line-height: 24px; color: #666;">
            </div>
            `,
    });
  }
}
