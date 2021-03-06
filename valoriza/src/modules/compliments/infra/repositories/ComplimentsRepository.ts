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

  async findAll(page: number, limit: number): Promise<Compliment[]> {
    const compliments = await this.complimentRepository.find({
      relations: ["userSender", "userReceiver", "tag"],
      skip: page,
      take: limit
    });
    return compliments;
  }

  async findAllUserReceiver(
    user_receiver: string,
    page: number,
    limit: number
  ): Promise<Compliment[]> {
    const complimentsAllUserReceiver = await this.complimentRepository.find({
      where: {
        user_receiver
      },
      relations: ["userSender", "tag"],
      skip: page,
      take: limit
    });
    return complimentsAllUserReceiver;
  }

  async findAllUserSender(
    user_sender: string,
    page: number,
    limit: number
  ): Promise<Compliment[]> {
    const complimentsAllUserSender = await this.complimentRepository.find({
      where: {
        user_sender
      },
      relations: ["userReceiver", "tag"],
      skip: page,
      take: limit
    });
    return complimentsAllUserSender;
  }

  async findById(id: string): Promise<Compliment> {
    const compliment = await this.complimentRepository.findOne(id);
    return compliment;
  }

  async countUserReceiver(user_receiver: string): Promise<number> {
    const countUserReceiver = await this.complimentRepository.count({
      user_receiver
    });
    return countUserReceiver;
  }

  async countUserSender(user_sender: string): Promise<number> {
    const countUserSender = await this.complimentRepository.count({
      user_sender
    });
    return countUserSender;
  }

  async countCompliments(): Promise<number> {
    const countCompliments = await this.complimentRepository.count();
    return countCompliments;
  }
}
