import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserSenderComplimentsUseCase } from "./ListUserSenderComplimentsUseCase";

export class ListUserSenderComplimentsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id } = request;
    const listUserSenderComplimentsUseCase = container.resolve(ListUserSenderComplimentsUseCase);
    const user_sender = await listUserSenderComplimentsUseCase.execute(user_id);
    return response.json(user_sender);
  }
}
