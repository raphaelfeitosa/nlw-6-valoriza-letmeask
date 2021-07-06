import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer";

import { IComplimentRepository } from "@modules/compliments/infra/repositories";

@injectable()
export class ListUserSenderComplimentsUseCase {
  constructor(
    @inject("ComplimentsRepository")
    private complimentsRepository: IComplimentRepository
  ) { }

  async execute(
    user_sender: string,
    page: number,
    limit: number
  ): Promise<Record<string, string | boolean>> {
    const count = await this.complimentsRepository.countUserSender(user_sender);
    const compliments = await this.complimentsRepository.findAllUserSender(
      user_sender,
      page = (page - 1) * limit,
      limit
    );
    return classToPlain({ compliments, count });
  }
}

