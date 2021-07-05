import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn
} from "typeorm";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";

import { Tag } from "@modules/tags/infra/typeorm/entities";
import { User } from "@modules/users/infra/typeorm/entities";

@Entity("compliments")
export class Compliment {
  @PrimaryColumn()
  readonly id: string;

  @Exclude()
  @Column()
  user_sender: string;

  @JoinColumn({ name: "user_sender" })
  @ManyToOne(() => User)
  userSender: User;

  @Exclude()
  @Column()
  user_receiver: string;

  @JoinColumn({ name: "user_receiver" })
  @ManyToOne(() => User)
  userReceiver: User;

  @Exclude()
  @Column()
  tag_id: string;

  @JoinColumn({ name: "tag_id" })
  @ManyToOne(() => Tag)
  tag: Tag;

  @Column()
  message: string

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
