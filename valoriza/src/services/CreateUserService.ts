import { hash } from "bcryptjs";
import { badRequest } from "@hapi/boom";
import { classToPlain } from 'class-transformer';
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUsersRequest {
    name: string;
    email: string;
    admin?: boolean;
    password: string;
}

class CreateUserService {

    async execute({ name, email, admin = false, password }: IUsersRequest) {

        const usersRepository = getCustomRepository(UsersRepositories);

        if (!email) throw badRequest("Email incorrect");

        const usersAlreadyExists = await usersRepository.findOne({
            email,
        });

        if (usersAlreadyExists) throw badRequest('User already exists', { code: 140 });

        const passwordHash = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        await usersRepository.save(user);

        return classToPlain(user);
    }
}
export { CreateUserService };