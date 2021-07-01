import { badRequest } from "@hapi/boom";
import { getCustomRepository, Repository } from "typeorm";
import { compare } from "bcryptjs";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { sign } from 'jsonwebtoken';

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
    }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: process.env.JWT_EXPIRATION_TIME,
    });

    return token;
  }
}

export { AuthenticateUserService };
