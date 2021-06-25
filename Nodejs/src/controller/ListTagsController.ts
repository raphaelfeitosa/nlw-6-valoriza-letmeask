import { Request, Response } from "express";
import { ListTagService } from "../services/ListTagService";

class ListTagsController {

    async handle(request: Request, response: Response) {
        const listTagsService = new ListTagService();

        const tag = await listTagsService.execute();
        return response.json(tag);
    }
}
export { ListTagsController };