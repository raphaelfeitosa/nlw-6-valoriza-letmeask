import { IUsersRepository } from "@modules/users/infra/repositories/userRepository/IUsersRepository";
import { UsersRepository } from "@modules/users/infra/repositories/userRepository/UserRepository";
import { container } from "tsyringe";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
)
