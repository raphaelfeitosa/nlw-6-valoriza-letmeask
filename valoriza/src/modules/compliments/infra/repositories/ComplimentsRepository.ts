import { getRepository, Repository } from "typeorm";
import { Compliment } from "@modules/compliments/infra/typeorm/entities";
import { IComplimentRepository } from "./IComplimentsRepository";
import { ICreateComplimentDTO } from "@modules/compliments/dtos";

export class ComplimentsRepository implements IComplimentRepository {
  private complimentRepository: Repository<Compliment>;

  constructor() {
    this.complimentRepository = getRepository(Compliment);
  }

  async create({
    tag_id,
    user_sender,
    user_receiver,
    message
  }: ICreateComplimentDTO): Promise<Compliment> {
    const compliment = this.complimentRepository.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    });
    await this.complimentRepository.save(compliment);
    return compliment;
  }

  async findAll(): Promise<Compliment[]> {
    const compliments = await this.complimentRepository.find();
    return compliments;
  }

  async findAllUserReceiver(user_receiver: string): Promise<Compliment[]> {
    const complimentsAllUserReceiver = await this.complimentRepository.find({
      where: {
        user_receiver
      },
      relations: ["userSender", "tag"],
    });
    return complimentsAllUserReceiver;
  }

  async findAllUserSender(user_sender: string): Promise<Compliment[]> {
    const complimentsAllUserSender = await this.complimentRepository.find({
      where: {
        user_sender
      },
      relations: ["userReceiver", "tag"]
    });
    return complimentsAllUserSender;
  }

  async findById(id: string): Promise<Compliment> {
    const compliment = await this.complimentRepository.findOne(id);
    return compliment;
  }
}
