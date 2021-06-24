import { Request, Response } from "express";
import { CreateComplementService } from "../services/CreateComplimentService";

class CreateComplimentController {

    async handle(request: Request, response: Response) {
        const { tag_id, user_sender, user_receiver, message } = request.body;

        const createComplimentService = new CreateComplementService();

        const compliment = await createComplimentService.execute({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        return response.status(201).json(compliment);
    }
}
export { CreateComplimentController };