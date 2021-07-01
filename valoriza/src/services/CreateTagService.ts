import { badRequest } from "@hapi/boom";
import { getCustomRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

interface ITagsRequest {
    name: string;
}

class CreateTagService {

    async execute({ name }: ITagsRequest) {
        const tagsRepositories = getCustomRepository(TagsRepositories);

        const tagAlreadyExists = await tagsRepositories.findOne({ name });

        if (tagAlreadyExists) {
            throw badRequest("Tag Already Exists", { code: 240 });
        }

        const tag = tagsRepositories.create({
            name
        });

        await tagsRepositories.save(tag);

        return tag;
    }
}
export { CreateTagService };