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

        if (!email) throw new Error("Email incorrect");

        const usersAlreadyExists = await usersRepository.findOne({
            email,
        });

        if (usersAlreadyExists) throw new Error("User already exists");

        const user = usersRepository.create({
            name,
            email,
            admin,
            password
        });

        await usersRepository.save(user);

        return user;
    }
}
export { CreateUserService };