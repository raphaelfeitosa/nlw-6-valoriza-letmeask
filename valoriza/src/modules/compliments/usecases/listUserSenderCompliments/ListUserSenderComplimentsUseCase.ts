import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer";
import { Compliment } from "@modules/compliments/infra/typeorm/entities";
import { IComplimentRepository } from "@modules/compliments/infra/repositories";

@injectable()
export class ListUserSenderComplimentsUseCase {
  constructor(
    @inject("ComplimentsRepository")
    private complimentsRepository: IComplimentRepository
  ) { }

  async execute(user_sender: string): Promise<Record<string, string | boolean>> {
    const compliments = await this.complimentsRepository.findAllUserSender(
      user_sender
    );

    return classToPlain(compliments);
  }
}

