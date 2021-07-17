import request from "supertest";
import { Connection, createConnection, getRepository } from "typeorm";

import { app } from "@shared/infra/http/app";
import { User } from "@modules/users/infra/typeorm/entities"
import { factory, jwtoken } from "@shared/utils/";
import { Tag } from "@modules/tags/infra/typeorm/entities";
import { Compliment } from "@modules/compliments/infra/typeorm/entities";
import faker from "faker";

let connection: Connection;

describe("List user sender controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });
  beforeEach(async () => {
    await connection.query("DELETE FROM compliments");
    await connection.query("DELETE FROM users");
    await connection.query("DELETE FROM tags");
  });
  afterAll(async () => {
    await connection.close();
  });

  it("should be able to list user sender compliments", async () => {
    const users = await factory.attrsMany<User>("User", 2, { admin: true });
    const tag = await factory.attrs<Tag>("Tag");
    const tagsRepository = getRepository(Tag);
    const usersRepository = getRepository(User);
    const complimentsRepository = getRepository(Compliment);
    const { id: tag_id } = await tagsRepository.save(tagsRepository.create(tag));
    const [user_sender, user_receiver] = await Promise.all(
      users.map((user) => usersRepository.save(usersRepository.create(user)))
    );
    const message = faker.lorem.sentence();
    await complimentsRepository.save(
      complimentsRepository.create({
        tag_id: tag_id,
        user_sender: user_sender.id,
        user_receiver: user_receiver.id,
        message,
      })
    );
    delete user_sender.password;
    delete user_receiver.password;
    const response = await request(app)
      .get("/api/v1/compliments/send")
      .set({ Authorization: `Bearer ${jwtoken(user_sender.id)}` })
      .send();
    expect(response.body).toContainEqual({
      id: expect.any(String),
      tag: {
        ...tag,
        name_custom: `#${tag.name}`,
        id: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
      userReceiver: {
        ...user_receiver,
        id: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
      message,
      created_at: expect.any(String),
    });
  });

  it("should be able to list a second page of sender compliments", async () => {
    const users = await factory.attrsMany<User>("User", 2, { admin: false });
    const tagsRepository = getRepository(Tag);
    const usersRepository = getRepository(User);
    const complimentsRepository = getRepository(Compliment);
    const tag = await tagsRepository.save(
      tagsRepository.create(await factory.attrs<Tag>("Tag"))
    );
    const [user_sender, user_receiver] = await Promise.all(
      users.map((user) => usersRepository.save(usersRepository.create(user)))
    );
    const compliments = await factory.attrsMany<Compliment>("Compliment", 25, {
      user_receiver: user_receiver.id,
      user_sender: user_sender.id,
      tag_id: tag.id,
    });
    await complimentsRepository.save(
      compliments.map((compliment) =>
        complimentsRepository.create({ ...compliment, id: faker.datatype.uuid() })
      ));
    delete user_sender.password;
    delete user_receiver.password;
    const response = await request(app)
      .get("/api/v1/compliments/send?page=2")
      .set({ Authorization: `Bearer ${jwtoken(user_sender.id)}` })
      .expect(200)
      .send();
    expect(response.status).toStrictEqual(200);
    compliments.slice(-5).forEach((compliment) => {
      expect(response.body).toContainEqual({
        id: expect.any(String),
        tag: {
          ...tag,
          name_custom: `#${tag.name}`,
          id: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
        userReceiver: {
          ...user_receiver,
          id: expect.any(String),
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
        message: expect.any(String),
        created_at: expect.any(String),
      });
    });
  });
});

