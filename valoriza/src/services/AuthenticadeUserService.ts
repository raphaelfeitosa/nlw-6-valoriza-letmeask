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

        if (!user) throw new Error("Email/password incorrect");

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) throw new Error("Email/password incorrect");

        const token = sign({
            email: user.email
        }, "5b40e996d5e2fd0b8a77da09e0585edd", {
            subject: user.id, expiresIn: "1D"
        });

        return token;
    }
}

export { AuthenticateUserService };