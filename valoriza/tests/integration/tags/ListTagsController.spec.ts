import request from "supertest";
import { Connection, createConnection, getRepository } from "typeorm";

import { app } from "@shared/infra/http/app";
import { User } from "@modules/users/infra/typeorm/entities"
import { factory, jwtoken } from "@shared/utils/";
import { Tag } from "@modules/tags/infra/typeorm/entities";

let connection: Connection;

describe("List tags controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });
  beforeEach(async () => {
    await connection.query("DELETE FROM users");
    await connection.query("DELETE FROM tags");
  });
  afterAll(async () => {
    await connection.close();
  });

  it("should be able to list tags", async () => {
    const user = await factory.attrs<User>("User", { admin: true });
    const tags = await factory.attrsMany<Tag>("Tag", 8);
    const usersRepository = getRepository(User);
    const tagsRepository = getRepository(Tag);
    const [{ id: user_id }] = await Promise.all([
      usersRepository.save(usersRepository.create(user)),
      tagsRepository.save(tags.map((tag) => tagsRepository.create(tag))),
    ]);
    const response = await request(app)
      .get("/api/v1/tags")
      .set({ Authorization: `Bearer ${jwtoken(user_id)}` })
      .expect(200)
      .send();
    tags.forEach((tag) => {
      expect(response.body).toContainEqual({
        id: expect.any(String),
        name_custom: `#${tag.name}`,
        created_at: expect.any(String),
        updated_at: expect.any(String),
        ...tag,
      });
    });
  });

  it("should be able list a second page of tags", async () => {
    const user = await factory.attrs<User>("User", { admin: true });
    const tags = await factory.attrsMany<Tag>("Tag", 20);
    const usersRepository = getRepository(User);
    const tagsRepository = getRepository(Tag);
    const [{ id: user_id }] = await Promise.all([
      usersRepository.save(usersRepository.create(user)),
      tagsRepository.save(tags.map((tag) => tagsRepository.create(tag))),
    ]);
    const response = await request(app)
      .get("/api/v1/tags?page=2")
      .set({ Authorization: `Bearer ${jwtoken(user_id)}` })
      .expect(200)
      .send();
    tags.slice(-5).forEach((tag) => {
      expect(response.body).toContainEqual({
        id: expect.any(String),
        name_custom: `#${tag.name}`,
        created_at: expect.any(String),
        updated_at: expect.any(String),
        ...tag,
      });
    });
  });
});
