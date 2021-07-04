import { badRequest, notFound } from "@hapi/boom";
import { ComplimentsRepositories } from "@modules/compliments/infra/repositories/ComplimentsRepositories";
import { UsersRepositories } from "@modules/users/infra/repositories/UsersRepositories";
import { getCustomRepository } from "typeorm";

interface IComplementRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}
class CreateComplementService {
  async execute({ tag_id, user_sender, user_receiver, message }: IComplementRequest) {
    const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
    const usersRepositories = getCustomRepository(UsersRepositories);

    if (user_sender === user_receiver) throw badRequest(
      'Is not allowed create a compliment from and to the same user',
      { code: 340 }
    );

    const userReceiverExists = await usersRepositories.findOne(user_receiver);

    if (!userReceiverExists) throw notFound('Receiver user not found', { code: 344 });

    const compliment = complimentsRepositories.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    await complimentsRepositories.save(compliment);

    return compliment;
  }
}
export { CreateComplementService };
