import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer";
import { UsersRepositories } from "@modules/users/infra/repositories/UsersRepositories";

class ListUsersService {

  async execute(): Promise<Record<string, string | boolean>> {
    const usersRepositories = getCustomRepository(UsersRepositories);

    const users = await usersRepositories.find();

    return classToPlain(users);
  }
}

export { ListUsersService };
