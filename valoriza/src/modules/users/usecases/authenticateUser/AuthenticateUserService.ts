import { badRequest } from "@hapi/boom";
import { getCustomRepository, Repository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import { UsersRepositories } from "@modules/users/infra/repositories/UsersRepositories";
import auth from "@config/auth";

interface IAuthenticateRequest {
  email: string;
  password: string;
}
class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({ email });

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

export { AuthenticateUserService };
