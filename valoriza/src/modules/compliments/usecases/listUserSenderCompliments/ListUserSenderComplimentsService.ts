import { ComplimentsRepositories } from "@modules/compliments/infra/repositories/ComplimentsRepositories";
import { getCustomRepository } from "typeorm";

class ListUserSenderComplimentsService {

  async execute(user_id: string) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);

    const compliments = await complimentsRepositories.find({
      where: {
        user_sender: user_id
      },
      relations: ["userReceiver", "tag"]
    });

    return compliments;
  }
}

export { ListUserSenderComplimentsService };
