import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/typeorm/entities";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findAll(page: number, limit: number): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  count(id: string): Promise<number>;
}
