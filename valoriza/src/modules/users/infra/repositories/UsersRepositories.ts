import { EntityRepository, Repository } from "typeorm";
import { User } from "@modules/users/infra/typeorm/entities/User";

@EntityRepository(User)
class UsersRepositories extends Repository<User>{
}
export { UsersRepositories };
