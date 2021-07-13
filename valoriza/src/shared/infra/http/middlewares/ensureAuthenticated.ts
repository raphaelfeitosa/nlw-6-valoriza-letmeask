import { badRequest, unauthorized } from "@hapi/boom";
import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const { authorization } = request.headers;
  if (!authorization) throw badRequest("Token not provided");
  const [, token] = authorization.split(" ");
  try {
    const { sub } = verify(
      token,
      auth.secret_token
    ) as IPayload;
    request.user_id = sub;
    return next();
  } catch (err) {
    throw unauthorized("Token invalid");
  }
}
