import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer"
import { ITagsRepository } from "@modules/tags/infra/repositories/tagRepository";
import { Tag } from "@modules/tags/infra/typeorm/entities/Tag";

@injectable()
export class ListTagUseCase {
  constructor(
    @inject("TagsRepository")
    private tagsRepository: ITagsRepository
  ) { }

  async execute(): Promise<Record<string, any>> {
    const tags = await this.tagsRepository.findAll();
    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));
    return classToPlain(tags);
  }
}
