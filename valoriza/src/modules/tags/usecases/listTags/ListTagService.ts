import { getCustomRepository } from "typeorm";
import { classToPlain } from "class-transformer"
import { TagsRepositories } from "@modules/tags/infra/repositories/TagsRepositories";

class ListTagService {
  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    let tags = await tagsRepositories.find();
    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));

    return classToPlain(tags);
  }
}

export { ListTagService };
