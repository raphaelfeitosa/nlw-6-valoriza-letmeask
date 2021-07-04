import { classToPlain } from "class-transformer";
import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "@modules/users/infra/repositories/userRepository";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(): Promise<Record<string, string | boolean>> {
    const users = await this.usersRepository.findAll();

    return classToPlain(users);
  }
}
