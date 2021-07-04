import { Request, Response } from "express";
import { CreateUserService } from "./CreateUserService";
import { UsersRepositories } from "@modules/users/infra/repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, admin, password } = request.body;

    const usersRepositories = getCustomRepository(UsersRepositories);

    const createUserService = new CreateUserService(usersRepositories);

    const user = await createUserService.execute({
      name,
      email,
      admin,
      password
    });
    return response.status(201).json(user);
  }
}
export { CreateUserController };
