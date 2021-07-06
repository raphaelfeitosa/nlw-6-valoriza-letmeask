import { Request, Response } from "express";
import { container } from "tsyringe";

import { PaginationLinks } from "@shared/utils";
import { ListUsersUseCase } from "./ListUsersUseCase";

export class ListUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const limit = 10;
    const { page = 1 } = request.query;
    const { user_id, currentUrl } = request;
    const listUsersUseCase = container.resolve(ListUsersUseCase);
    const { users, count } = await listUsersUseCase.execute(
      user_id,
      Number(page),
      limit
    );
    response.header("X-Total-Count", count.toString());
    const pagesTotal = Math.ceil(Number(count) / limit);
    if (pagesTotal > 1) {
      response.links(
        PaginationLinks.generate(
          Number(page),
          pagesTotal,
          currentUrl
        )
      );
    }
    return response.json(users);
  }
}
