import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer";
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
      page = (page - 1) * limit,
      limit
    );
    return classToPlain({ compliments, count });
  }
}
