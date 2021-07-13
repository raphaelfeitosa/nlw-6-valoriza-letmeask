import { hash } from "bcryptjs";
import { verify } from "jsonwebtoken";
import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { UsersRepository } from "@modules/users/infra/repositories/userRepository"
import { app } from "@shared/infra/http/app";
import { User } from "@modules/users/infra/typeorm/entities"
import { factory } from "@shared/utils/";
import auth from "@config/auth";

let connection: Connection;

describe("Authenticate user controller", () => {
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

  it("should be able to login", async () => {
    const { admin, password, name, email } = await factory.attrs<User>('User');
    const usersRepository = new UsersRepository();
    const user_created = await usersRepository.create({
      admin,
      password: await hash(password, 8),
      name,
      email
    });
    const response = await request(app)
      .post("/api/v1/sessions")
      .expect(200)
      .send({
        email,
        password
      });
    expect(response.body).toStrictEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: {
          name: user_created.name,
          email: user_created.email
        },
        refresh_token: expect.any(String)
      }),
    );
    expect(
      verify(response.body.token, auth.secret_token)
    ).toBeTruthy();
  });

  it("should not be able to login with non existing user", async () => {
    const { password, email } = await factory.attrs<User>("User");
    const response = await request(app)
      .post("/api/v1/sessions")
      .expect(400)
      .send({
        email,
        password,
      });
    expect(response.body)
      .toStrictEqual({
        statusCode: 400,
        error: "Bad Request",
        message: "Email/password incorrect",
      });
  });

  it("should not be able to login with wrong password", async () => {
    const { admin, password, name, email } = await factory.attrs<User>('User');
    const usersRepository = new UsersRepository();
    await usersRepository.create({
      admin,
      password: await hash(password, 8),
      name,
      email
    });
    const response = await request(app)
      .post("/api/v1/sessions")
      .expect(400)
      .send({
        email,
        password: "wrong-password"
      });
    expect(response.body)
      .toStrictEqual({
        statusCode: 400,
        error: "Bad Request",
        message: "Email/password incorrect",
      });
  });

  it("should not be able to login with wrong email", async () => {
    const { admin, password, name, email } = await factory.attrs<User>('User');
    const usersRepository = new UsersRepository();
    await usersRepository.create({
      admin,
      password: await hash(password, 8),
      name,
      email
    });
    const response = await request(app)
      .post("/api/v1/sessions")
      .expect(400)
      .send({
        email: "jonhdoe@gmail.com",
        password
      });
    expect(response.body)
      .toStrictEqual({
        statusCode: 400,
        error: "Bad Request",
        message: "Email/password incorrect",
      });
  });
});
