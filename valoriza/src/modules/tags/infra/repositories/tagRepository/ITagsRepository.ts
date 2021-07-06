import { ICreateTagDTO } from "@modules/tags/dtos/ICreateTagDTO";
import { Tag } from "@modules/tags/infra/typeorm/entities/Tag";

export interface ITagsRepository {
  create(name: ICreateTagDTO): Promise<Tag>;
  findAll(page: number, limit: number): Promise<Tag[]>;
  findByName(name: string): Promise<Tag | null>;
  findById(id: string): Promise<Tag | null>;
  count(id: string): Promise<number>;
}
