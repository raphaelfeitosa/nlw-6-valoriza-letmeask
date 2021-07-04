import { hash } from "bcryptjs";
import { badRequest } from "@hapi/boom";
import { classToPlain } from 'class-transformer';
import { getCustomRepository, Repository } from "typeorm";
import { UsersRepositories } from "@modules/users/infra/repositories/UsersRepositories";
import { User } from "@modules/users/infra/typeorm/entities/User";

interface IUsersRequest {
  name: string;
  email: string;
  admin?: boolean;
  password: string;
}

class CreateUserService {
  private usersRepository: Repository<User>;

  constructor(usersRepository: Repository<User>) {
    this.usersRepository = usersRepository;
  }

  async execute({
    name,
    email,
    admin = false,
    password
  }: IUsersRequest): Promise<Record<string, string | boolean>> {

    // const usersRepository = getCustomRepository(UsersRepositories);

    const usersAlreadyExists = await this.usersRepository.findOne({
      email,
    });

    if (usersAlreadyExists) throw badRequest('User already exists', { code: 140 });

    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    });

    await this.usersRepository.save(user);

    return classToPlain(user);
  }
}
export { CreateUserService };
