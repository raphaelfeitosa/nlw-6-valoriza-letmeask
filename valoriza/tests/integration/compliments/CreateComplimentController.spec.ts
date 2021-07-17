import request from "supertest";
import { Connection, createConnection, getRepository } from "typeorm";
import faker from "faker";

import { app } from "@shared/infra/http/app";
import { User } from "@modules/users/infra/typeorm/entities"
import { factory, jwtoken } from "@shared/utils/";
import { Tag } from "@modules/tags/infra/typeorm/entities";

let connection: Connection;

describe("Create tag controller", () => {
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

  it("should be able to create a new compliment", async () => {
    const user = await factory.attrs<User>("User");
    const tag = await factory.attrs<Tag>("Tag");
    const usersRepository = getRepository(User);
    const tagsRepository = getRepository(Tag);
    const [{ id: user_sender }, { id: tag_id }] = await Promise.all([
      usersRepository.save(usersRepository.create(user)),
      tagsRepository.save(tagsRepository.create(tag))
    ]);
    const userReceiver = await factory.attrs<User>("User", { admin: true });
    const { id: user_receiver } = await usersRepository.save(
      usersRepository.create(userReceiver)
    );
    const message = faker.lorem.sentence();
    const response = await request(app)
      .post("/api/v1/compliments")
      .set({ Authorization: `Bearer ${jwtoken(user_sender)}` })
      .expect(201)
      .send({
        tag_id,
        user_receiver,
        message
      });
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      tag_id,
      user_sender,
      user_receiver,
      message,
      created_at: expect.any(String),
    });
  });

  it("should not be able to create a new compliment when receiver and sender is the same user", async () => {
    const user = await factory.attrs<User>("User");
    const tag = await factory.attrs<Tag>("Tag");
    const usersRepository = getRepository(User);
    const tagsRepository = getRepository(Tag);
    const [{ id: user_sender }, { id: tag_id }] = await Promise.all([
      usersRepository.save(usersRepository.create(user)),
      tagsRepository.save(tagsRepository.create(tag))
    ]);
    const message = faker.lorem.sentence();
    const response = await request(app)
      .post("/api/v1/compliments")
      .set({ Authorization: `Bearer ${jwtoken(user_sender)}` })
      .expect(400)
      .send({
        tag_id,
        user_receiver: user_sender,
        message
      });
    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: "Bad Request",
      message: "Is not allowed create a compliment from and to the same user",
    });
  });

  it("should not be able to create a new compliment with non existing receiver user", async () => {
    const user = await factory.attrs<User>("User");
    const tag = await factory.attrs<Tag>("Tag");
    const usersRepository = getRepository(User);
    const tagsRepository = getRepository(Tag);
    const [{ id: user_sender }, { id: tag_id }] = await Promise.all([
      usersRepository.save(usersRepository.create(user)),
      tagsRepository.save(tagsRepository.create(tag))
    ]);
    const message = faker.lorem.sentence();
    const response = await request(app)
      .post("/api/v1/compliments")
      .set({ Authorization: `Bearer ${jwtoken(user_sender)}` })
      .expect(404)
      .send({
        tag_id,
        user_receiver: faker.datatype.uuid(),
        message
      });
    expect(response.body).toStrictEqual({
      statusCode: 404,
      error: "Not Found",
      message: "Receiver user not found",
    });
  });
});
