import { ICreateComplimentDTO } from "@modules/compliments/dtos";
import { Compliment } from "../typeorm/entities";

export interface IComplimentRepository {
  create(data: ICreateComplimentDTO): Promise<Compliment>;
  findAll(): Promise<Compliment[]>;
  findAllUserReceiver(user_receiver: string): Promise<Compliment[]>;
  findAllUserSender(user_sender: string): Promise<Compliment[]>;
  findById(id: string): Promise<Compliment>;
}
