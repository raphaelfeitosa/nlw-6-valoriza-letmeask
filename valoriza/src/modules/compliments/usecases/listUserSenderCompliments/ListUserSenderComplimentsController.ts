import { Request, Response } from "express";
import { ListUserSenderComplimentsService } from "./ListUserSenderComplimentsService";

class ListUserSenderComplimentsController {

  async handle(request: Request, response: Response) {
    const { user_id } = request;

    const listUserSenderComplimentsService = new ListUserSenderComplimentsService();

    const user_sender = await listUserSenderComplimentsService.execute(user_id);
    return response.json(user_sender);
  }
}
export { ListUserSenderComplimentsController };
