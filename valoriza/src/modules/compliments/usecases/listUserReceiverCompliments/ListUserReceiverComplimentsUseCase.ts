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

  async execute(user_receiver: string): Promise<Record<string, string | boolean>> {
    const compliments = await this.complimentsRepository.findAllUserReceiver(
      user_receiver
    );
    return classToPlain(compliments);
  }
}
