import request from "supertest";
import { Connection, createConnection, getRepository } from "typeorm";

import { app } from "@shared/infra/http/app";
import { User } from "@modules/users/infra/typeorm/entities"
import { factory, jwtoken } from "@shared/utils/";

let connection: Connection;

describe("List users controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });
  beforeEach(async () => {
    await connection.query("DELETE FROM users");
  });
  afterAll(async () => {
    await connection.close();
  });

  it("should be able to list users", async () => {
    const users = await factory.attrsMany<User>("User", 10);
    const usersRepository = getRepository(User);
    const [{ id: user_id }] = await usersRepository.save(
      users.map((user) => usersRepository.create(user))
    );
    const response = await request(app)
      .get("/api/v1/users")
      .set({ Authorization: `Bearer ${jwtoken(user_id)}` })
      .expect(200)
      .send();
    users.forEach((user) => {
      delete user.password;
      expect(response.body).toContainEqual({
        id: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        ...user,
      });
    });
  });

  it("should be able to list a second page of users", async () => {
    const users = await factory.attrsMany<User>("User", 20, { admin: true });
    const usersRepository = getRepository(User);
    const [{ id: user_id }] = await usersRepository.save(
      users.map((user) => usersRepository.create(user))
    );
    const response = await request(app)
      .get("/api/v1/users?page=2")
      .set({ Authorization: `Bearer ${jwtoken(user_id)}` })
      .expect(200)
      .send();
    users.slice(-5).forEach((user) => {
      delete user.password;
      expect(response.body).toContainEqual({
        id: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
        ...user,
      });
    });
  });
});
