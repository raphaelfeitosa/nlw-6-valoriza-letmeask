import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserReceiverComplimentsUseCase } from "./ListUserReceiverComplimentsUseCase";
import { PaginationLinks } from "@shared/utils";

export class ListUserReceiverComplimentsController {
  async handle(request: Request, response: Response) {
    const limit = 10;
    const { page = 1 } = request.query;
    const { user_id, currentUrl } = request;

    const listUserReceiverComplimentsUseCase = container.resolve(ListUserReceiverComplimentsUseCase);

    const { compliments, count } = await listUserReceiverComplimentsUseCase.execute(user_id, Number(page), limit);

    response.header("X-Total-Count", count.toString());

    const pagesTotal = Math.ceil(Number(count) / limit);

    if (pagesTotal > 1) {
      response.links(
        PaginationLinks.generate(Number(page), pagesTotal, currentUrl
        )
      );
    }
    return response.json(compliments);
  }
}
