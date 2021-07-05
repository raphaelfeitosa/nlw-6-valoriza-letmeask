import { getRepository, Repository } from "typeorm";
import { User } from "@modules/users/infra/typeorm/entities";
import { IUsersRepository } from "./IUsersRepository";
import { ICreateUserDTO } from "@modules/users/dtos";

export class UsersRepository implements IUsersRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = getRepository(User);
  }

  async create({ name, email, password, admin }: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      name,
      email,
      password,
      admin
    });
    await this.userRepository.save(user);
    return user;
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    const users = await this.userRepository.find({
      skip: page,
      take: limit
    });
    return users;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userRepository.findOne(id);
    return user;
  }

  async count(id: string): Promise<number> {
    const count = await this.userRepository.count({
      id
    });
    return count;
  }

}
