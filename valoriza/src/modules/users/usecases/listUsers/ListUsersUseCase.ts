import { classToPlain } from "class-transformer";
import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "@modules/users/infra/repositories/userRepository/IUsersRepository";
import { User } from "@modules/users/infra/typeorm/entities/User";

@injectable()
class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(): Promise<Record<string, string | boolean>> {
    const users = await this.usersRepository.findAll();

    return classToPlain(users);
  }
}
export { ListUsersUseCase };
