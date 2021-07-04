import { badRequest, notFound } from "@hapi/boom";
import { inject, injectable } from "tsyringe";
import { ICreateComplimentDTO } from "@modules/compliments/dtos";
import { IComplimentRepository } from "@modules/compliments/infra/repositories";
import { Compliment } from "@modules/compliments/infra/typeorm/entities/";
import { IUsersRepository } from "@modules/users/infra/repositories/userRepository";


@injectable()
export class CreateComplimentUseCase {
  constructor(
    @inject("ComplimentsRepository")
    private complimentsRepository: IComplimentRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message
  }: ICreateComplimentDTO): Promise<Compliment> {
    if (user_sender === user_receiver) throw badRequest(
      'Is not allowed create a compliment from and to the same user',
      { code: 340 });

    const userReceiverExists = await this.usersRepository.findById(user_receiver);

    if (!userReceiverExists) throw notFound('Receiver user not found', { code: 344 });

    const compliment = this.complimentsRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });
    return compliment;
  }
}
