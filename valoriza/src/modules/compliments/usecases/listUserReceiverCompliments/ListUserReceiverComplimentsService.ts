import { getCustomRepository } from "typeorm";
import { ComplimentsRepositories } from "@modules/compliments/infra/repositories/ComplimentsRepositories";

class ListUserReceiverComplimentsService {

  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.find({
      where: {
        user_receiver: user_id,
      },
      relations: ["userSender", "tag"],
    });

    return compliments;
  }
}

export { ListUserReceiverComplimentsService };
