import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer"

import { ITagsRepository } from "@modules/tags/infra/repositories/tagRepository";

@injectable()
export class ListTagUseCase {
  constructor(
    @inject("TagsRepository")
    private tagsRepository: ITagsRepository
  ) { }

  async execute(
    user_id: string,
    page: number,
    limit: number
  ): Promise<Record<string, any>> {
    const count = await this.tagsRepository.count(user_id);
    const tags = await this.tagsRepository.findAll(
      page = (page - 1) * limit,
      limit
    );
    // tags = tags.map((tag) => ({ ...tag, nameCustom: `#${tag.name}` }));
    return classToPlain({ tags, count });
  }
}
