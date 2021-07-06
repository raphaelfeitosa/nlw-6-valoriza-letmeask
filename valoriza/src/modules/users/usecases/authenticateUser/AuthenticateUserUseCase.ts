import { badRequest } from "@hapi/boom";
import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import auth from "@config/auth";
import { ICreateUserTokenDTO } from "@modules/users/dtos";
import { IUsersRepository } from "@modules/users/infra/repositories/userRepository";

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: ICreateUserTokenDTO): Promise<any> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) throw badRequest("Email/password incorrect");
    const passwordMatch = await compare(password, user.password);
    if (!passwordMatch) throw badRequest("Email/password incorrect");
    const token = sign({
      email: user.email
    }, auth.secret_token, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });
    return token;
  }
}
