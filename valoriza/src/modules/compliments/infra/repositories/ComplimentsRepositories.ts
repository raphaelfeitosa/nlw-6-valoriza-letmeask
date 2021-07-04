import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "@modules/compliments/infra/typeorm/entities/Compliment";

@EntityRepository(Compliment)
class ComplimentsRepositories extends Repository<Compliment>{
}
export { ComplimentsRepositories };
