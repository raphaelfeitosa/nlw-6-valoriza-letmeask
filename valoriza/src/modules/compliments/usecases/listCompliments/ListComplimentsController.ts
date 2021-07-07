import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListComplimentsUseCase } from "./ListComplimentsUseCase";
import { PaginationLinks } from "@shared/utils";

export class ListComplimentsController {
  async handle(request: Request, response: Response) {
    const limit = 10;
    const { page = 1 } = request.query;
    const { currentUrl } = request;
    const listComplimentsUseCase = container.resolve(ListComplimentsUseCase);
    const { compliments, count } = await listComplimentsUseCase.execute(
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
    return response.json(compliments);
  }
}
