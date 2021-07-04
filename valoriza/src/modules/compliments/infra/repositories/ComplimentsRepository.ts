import { getRepository, Repository } from "typeorm";
import { Compliment } from "@modules/compliments/infra/typeorm/entities";
import { IComplimentRepository } from "./IComplimentsRepository";
import { ICreateComplimentDTO } from "@modules/compliments/dtos";

export class ComplimentsRepositories implements IComplimentRepository {
  private complimentRepository: Repository<Compliment>;

  constructor() {
    this.complimentRepository = getRepository(Compliment);
  }

  async create({ tag_id, user_receiver, user_sender, message }: ICreateComplimentDTO): Promise<Compliment> {
    const compliment = this.complimentRepository.create({
      tag_id, user_receiver, user_sender, message
    });
    await this.complimentRepository.save(compliment);
    return compliment;
  }
  async findAll(): Promise<Compliment[]> {
    const compliments = await this.complimentRepository.find();
    return compliments;
  }
  async findAllUserReceiver(user_receiver: string): Promise<Compliment> {
    throw new Error("Method not implemented.");
  }
  async findAllUserSender(user_sender: string): Promise<Compliment> {
    throw new Error("Method not implemented.");
  }
  async findById(id: string): Promise<Compliment> {
    const compliment = await this.complimentRepository.findOne(id);
    return compliment;
  }
}
