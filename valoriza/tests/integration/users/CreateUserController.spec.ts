import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { UsersRepository } from "@modules/users/infra/repositories/userRepository"
import { app } from "@shared/infra/http/app";
import { User } from "@modules/users/infra/typeorm/entities"
import { factory } from "@shared/utils/";

let connection: Connection;

describe("Create user controller", () => {
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

  it("should be able to create a new user", async () => {
    const { name, password, email } = await factory.attrs<User>("User");
    const response = await request(app)
      .post("/api/v1/users")
      .send({
        name,
        password,
        email
      });
    expect(response.status).toBe(201);
  });

  it("should be able to create a new admin user", async () => {
    const { admin, name, password, email } = await factory.attrs<User>("User", { admin: true });
    const response = await request(app)
      .post("/api/v1/users")
      .send({
        admin,
        name,
        password,
        email
      });
    expect(response.status).toBe(201);
  });

  it("should not be able to create a new user with existing email", async () => {
    const { name, password, email } = await factory.attrs<User>("User");
    const usersRepository = new UsersRepository();
    await usersRepository.create({
      password: await hash(password, 8),
      name,
      email
    });
    const response = await request(app).post("/api/v1/users")
      .send({
        name,
        password,
        email
      });
    expect(response.body)
      .toStrictEqual({
        statusCode: 400,
        error: "Bad Request",
        message: "User already exists",
      });
  });
});
