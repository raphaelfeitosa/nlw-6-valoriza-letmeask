import { classToPlain } from "class-transformer";
import { injectable, inject } from "tsyringe";
import { IUsersRepository } from "@modules/users/infra/repositories/userRepository";

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(
    user_id: string,
    page: number,
    limit: number
  ): Promise<Record<string, string | boolean>> {
    const count = await this.usersRepository.count(user_id);

    const users = await this.usersRepository.findAll(
      page = (page - 1) * limit,
      limit
    );

    return classToPlain({ users, count });
  }
}
