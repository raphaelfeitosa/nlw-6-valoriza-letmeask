import request from "supertest";
import { Connection, createConnection, getRepository } from "typeorm";

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
    await connection.query("DELETE FROM tags");
    await connection.query("DELETE FROM users");
  });
  afterAll(async () => {
    await connection.close();
  });
  it("should be able to create a new tag", async () => {
    const user = await factory.attrs<User>("User", { admin: true });
    const tag = await factory.attrs<Tag>("Tag");
    const usersRepository = getRepository(User);
    const { id: user_id } = await usersRepository.save(
      usersRepository.create(user)
    );
    const response = await request(app)
      .post("/api/v1/tags")
      .set({ Authorization: `Bearer ${jwtoken(user_id)}` })
      .expect(201)
      .send(tag);
    expect(response.body).toStrictEqual({
      id: expect.any(String),
      created_at: expect.any(String),
      updated_at: expect.any(String),
      ...tag,
    });
  });

  it("should not be authorized to create a new tag", async () => {
    const user = await factory.attrs<User>("User", { admin: false });
    const tag = await factory.attrs<Tag>("Tag");
    const usersRepository = getRepository(User);
    const { id: user_id } = await usersRepository.save(
      usersRepository.create(user)
    );
    const response = await request(app)
      .post("/api/v1/tags")
      .set({ Authorization: `Bearer ${jwtoken(user_id)}` })
      .expect(401)
      .send(tag);
    expect(response.body).toStrictEqual({
      statusCode: 401,
      error: 'Unauthorized',
      message: 'You are not authorized',
    });
  });

  it("should not be able to duplicate a tag", async () => {
    const user = await factory.attrs<User>("User", { admin: true });
    const tag = await factory.attrs<Tag>("Tag");
    const usersRepository = getRepository(User);
    const { id: user_id } = await usersRepository.save(
      usersRepository.create(user)
    );
    await request(app)
      .post("/api/v1/tags")
      .set({ Authorization: `Bearer ${jwtoken(user_id)}` })
      .expect(201)
      .send(tag);
    const response = await request(app)
      .post("/api/v1/tags")
      .set({ Authorization: `Bearer ${jwtoken(user_id)}` })
      .expect(400)
      .send(tag);
    expect(response.body).toStrictEqual({
      statusCode: 400,
      error: "Bad Request",
      message: "Tag already exists",
    });
  });
});
