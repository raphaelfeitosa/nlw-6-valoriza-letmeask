import { inject, injectable } from "tsyringe";
import { Compliment } from "@modules/compliments/infra/typeorm/entities";
import { IComplimentRepository } from "@modules/compliments/infra/repositories";

@injectable()
export class ListUserSenderComplimentsUseCase {
  constructor(
    @inject("ComplimentsRepository")
    private complimentsRepository: IComplimentRepository
  ) { }

  async execute(user_id: string): Promise<Compliment[]> {
    const compliments = await this.complimentsRepository.findAllUserSender(
      user_id
    );

    return compliments;
  }
}

