import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer";
import { Compliment } from "@modules/compliments/infra/typeorm/entities";
import { IComplimentRepository } from "@modules/compliments/infra/repositories";

@injectable()
export class ListUserReceiverComplimentsUseCase {
  constructor(
    @inject("ComplimentsRepository")
    private complimentsRepository: IComplimentRepository
  ) { }

  async execute(
    user_receiver: string,
    page: number,
    limit: number
  ): Promise<Record<string, string | boolean>> {
    const count = await this.complimentsRepository.countUserReceiver(user_receiver);

    const compliments = await this.complimentsRepository.findAllUserReceiver(
      user_receiver,
      page,
      limit
    );
    return classToPlain({ compliments, count });
  }
}
