import { ICreateTagDTO } from "@modules/tags/dtos/ICreateTagDTO";
import { getRepository, Repository } from "typeorm";
import { Tag } from "../../typeorm/entities/Tag";
import { ITagsRepository } from "./ITagsRepository";

export class TagsRepository implements ITagsRepository {
  private tagsRepository: Repository<Tag>;

  constructor() {
    this.tagsRepository = getRepository(Tag);
  }

  async create({ name }: ICreateTagDTO): Promise<void> {
    const tag = await this.tagsRepository.create({ name });
    await this.tagsRepository.save(tag);
  }
  async findAll(): Promise<Tag[]> {
    const tags = await this.tagsRepository.find();
    return tags;
  }
  async findById(id: string): Promise<Tag> {
    const tag = await this.tagsRepository.findOne(id);
    return tag;
  }
}
