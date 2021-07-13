import { badRequest } from "@hapi/boom";
import { inject, injectable } from "tsyringe"

import { ICreateTagDTO } from "@modules/tags/dtos/ICreateTagDTO";
import { ITagsRepository } from "@modules/tags/infra/repositories/tagRepository";
import { Tag } from "@modules/tags/infra/typeorm/entities/Tag";

@injectable()
export class CreateTagUseCase {
  constructor(
    @inject("TagsRepository")
    private tagsRepository: ITagsRepository
  ) { }

  async execute({ name }: ICreateTagDTO): Promise<Tag> {
    const tagAlreadyExists = await this.tagsRepository.findByName(name);
    if (tagAlreadyExists) throw badRequest("Tag already exists");
    const tag = await this.tagsRepository.create({ name });
    return tag;
  }
}
