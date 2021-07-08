import { badRequest } from "@hapi/boom";
import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import auth from "@config/auth";
import { IUsersRepository } from "@modules/users/infra/repositories/userRepository";
import { IDateProvider } from "@shared/container/providers/dateProvider";
import { IUsersTokensRepository } from "@modules/users/infra/repositories/userToken";
import { IRequestAuthenticateDTO, IResponseAuthenticateDTO } from "@modules/users/dtos";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DaysJSDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute({ email, password }: IRequestAuthenticateDTO): Promise<IResponseAuthenticateDTO> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw badRequest("Email/password incorrect");
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw badRequest("Email/password incorrect");
    const token = sign({},
      auth.secret_token, {
      subject: user.id,
      expiresIn: auth.expires_in_token,
    });
    const refresh_token = sign({
      email
    },
      auth.secret_refresh_token, {
      subject: user.id,
      expiresIn: auth.expires_in_refresh_token
    });
    const refresh_token_expires_date =
      this.dateProvider.addDays(auth.expires_refresh_token_days);
    await this.usersTokensRepository.create({
      expires_date: refresh_token_expires_date,
      refresh_token,
      user_id: user.id
    });
    const tokenReturn: IResponseAuthenticateDTO = {
      token,
      user: {
        name: user.name,
        email: user.email
      },
      refresh_token
    }
    return tokenReturn;
  }
}
