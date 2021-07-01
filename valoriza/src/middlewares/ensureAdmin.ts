import { Request, Response, NextFunction } from "express";
import { unauthorized } from "@hapi/boom";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

export async function ensureAdmin(request: Request, response: Response, next: NextFunction) {

  const { user_id } = request;

  const usersRepositories = getCustomRepository(UsersRepositories);

  const { admin } = await usersRepositories.findOne(user_id);

  if (admin) {
    return next();
  }

  throw unauthorized('You are not authorized', 'sample', { code: 541 });

}
