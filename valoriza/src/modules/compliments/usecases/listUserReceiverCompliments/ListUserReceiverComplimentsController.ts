import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListUserReceiverComplimentsUseCase } from "./ListUserReceiverComplimentsUseCase";

export class ListUserReceiverComplimentsController {

  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserReceiverComplimentsUseCase = container.resolve(ListUserReceiverComplimentsUseCase);

    const user_receiver = await listUserReceiverComplimentsUseCase.execute(user_id);
    return response.json(user_receiver);
  }
}
