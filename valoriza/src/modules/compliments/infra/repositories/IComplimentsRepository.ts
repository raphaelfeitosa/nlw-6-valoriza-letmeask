import { ICreateComplimentDTO } from "@modules/compliments/dtos";
import { Compliment } from "../typeorm/entities";

export interface IComplimentRepository {
  create(data: ICreateComplimentDTO): Promise<Compliment>;
  findAll(): Promise<Compliment[]>;
  findAllUserReceiver(user_receiver: string, limit: number, page: number): Promise<Compliment[]>;
  findAllUserSender(user_sender: string, limit: number, page: number): Promise<Compliment[]>;
  findById(id: string): Promise<Compliment>;
  countUserReceiver(user_receiver: string): Promise<number>;
  countUserSender(user_sender: string): Promise<number>;
}
