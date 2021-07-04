import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListTagUseCase } from "./ListAllTagsUseCase";

export class ListAllTagsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listAllTagsUseCase = container.resolve(ListTagUseCase);
    const tag = await listAllTagsUseCase.execute();
    return response.json(tag);
  }
}
