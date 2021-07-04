import { Request, Response, NextFunction } from "express";
import { unauthorized } from "@hapi/boom";
import { container } from "tsyringe";
import { UsersRepository } from "@modules/users/infra/repositories/userRepository";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {
  const { user_id } = request;

  const usersRepository = container.resolve(UsersRepository);

  const { admin } = await usersRepository.findById(user_id);

  if (admin) {
    return next();
  }
  throw unauthorized('You are not authorized', 'sample', { code: 541 });
}
