import { ICreateTagDTO } from "@modules/tags/dtos/ICreateTagDTO";
import { getRepository, Repository } from "typeorm";
import { Tag } from "../../typeorm/entities/Tag";
import { ITagsRepository } from "./ITagsRepository";

export class TagsRepository implements ITagsRepository {
  private tagsRepository: Repository<Tag>;

  constructor() {
    this.tagsRepository = getRepository(Tag);
  }

  async create({ name }: ICreateTagDTO): Promise<Tag> {
    const tag = this.tagsRepository.create({ name });
    await this.tagsRepository.save(tag);
    return tag;
  }

  async findAll(page: number, limit: number): Promise<Tag[]> {
    const tags = await this.tagsRepository.find({
      skip: page,
      take: limit
    });
    return tags;
  }

  async findByName(name: string): Promise<Tag | null> {
    const tag = await this.tagsRepository.findOne({ name });
    return tag;
  }

  async findById(id: string): Promise<Tag | null> {
    const tag = await this.tagsRepository.findOne({ id });
    return tag;
  }

  async count(id: string): Promise<number> {
    const count = await this.tagsRepository.count({ id });
    return count;
  }

}
