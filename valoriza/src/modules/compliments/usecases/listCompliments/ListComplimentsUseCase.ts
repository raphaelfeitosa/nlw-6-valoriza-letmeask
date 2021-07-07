import { inject, injectable } from "tsyringe";
import { classToPlain } from "class-transformer";
import { IComplimentRepository } from "@modules/compliments/infra/repositories";

@injectable()
export class ListComplimentsUseCase {
  constructor(
    @inject("ComplimentsRepository")
    private complimentsRepository: IComplimentRepository
  ) { }

  async execute(
    page: number,
    limit: number
  ): Promise<Record<string, string | boolean>> {
    const count = await this.complimentsRepository.countCompliments();
    const compliments = await this.complimentsRepository.findAll(
      page = (page - 1) * limit,
      limit
    );
    return classToPlain({ compliments, count });
  }
}
