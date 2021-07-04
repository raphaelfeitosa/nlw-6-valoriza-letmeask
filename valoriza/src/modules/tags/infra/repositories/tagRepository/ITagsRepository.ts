import { ICreateTagDTO } from "@modules/tags/dtos/ICreateTagDTO";
import { Tag } from "@modules/tags/infra/typeorm/entities/Tag";

export interface ITagsRepository {
  create(data: ICreateTagDTO): Promise<Tag>;
  findAll(): Promise<Tag[]>;
  findByName(name: string): Promise<Tag | null>;
  findById(id: string): Promise<Tag | null>;
}
