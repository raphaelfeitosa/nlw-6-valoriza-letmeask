import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { badRequest } from "@hapi/boom";
import { classToPlain } from 'class-transformer';

import { ICreateUserDTO } from "@modules/users/dtos";
import { IUsersRepository } from "@modules/users/infra/repositories/userRepository";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository) { }

  async execute({
    name,
    email,
    admin = false,
    password
  }: ICreateUserDTO): Promise<Record<string, string | boolean>> {
    const usersAlreadyExists = await this.usersRepository.findByEmail(email);
    if (usersAlreadyExists) throw badRequest('User already exists');
    const passwordHash = await hash(password, 8);
    const user = this.usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    });
    return classToPlain(user);
  }
}
