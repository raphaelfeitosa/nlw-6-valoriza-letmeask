import { badRequest } from "@hapi/boom";
import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';

import auth from "@config/auth";
import { ICreateUserTokenDTO } from "@modules/users/dtos/ICreateUserTokenDTO";
import { IUsersRepository } from "@modules/users/infra/repositories/userRepository/IUsersRepository";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: ICreateUserTokenDTO) {

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
export { AuthenticateUserUseCase };
