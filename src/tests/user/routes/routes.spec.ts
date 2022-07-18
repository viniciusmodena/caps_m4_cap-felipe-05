import request from "supertest";
import app from "../../../app";
import { DataSource, Unique } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/user.entity";

describe("Create an user", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    const userRepository = AppDataSource.getRepository(User);
    await userRepository.createQueryBuilder().delete().from(User).execute();

    await connection.destroy();
  });

  test("Should be able to create a new user", async () => {
    const user_name = "teste_integration";
    const email = "teste_integration@mail.com";
    const password = "1234";
    const is_adm = true;

    const userData = { user_name, email, password, is_adm };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        user_name,
        email,
        is_adm,
      })
    );
  });

  test("Should be able to list all registered users", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("map");
  });

  test("Should be able to list a specifc user", async () => {
    const response = await request(app).get("/users");

    const id = response.body[0].id;

    const user_name = response.body[0].user_name;

    const responseOne = await request(app).get(`/users/${id}`);

    expect(responseOne.status).toBe(200);

    expect(responseOne.body).toHaveProperty("user_name", user_name);

    expect(responseOne.body.id).toEqual(id);
  });

  test("Should be able to update a specifc user", async () => {
    const response = await request(app).get("/users");
    const id = response.body[0].id;
    const email = "fulano@mail.com";

    const userData = { email };

    const responseOne = await request(app).patch(`/users/${id}`).send(userData);

    expect(responseOne.status).toBe(200);

    expect(responseOne.body).toHaveProperty("email", email);
  });

  test("Should be able to delete a specific user", async () => {
    const response = await request(app).get("/users");
    const id = response.body[0].id;

    const responseOne = await request(app).delete(`/users/${id}`);

    expect(responseOne.status).toBe(200);

    expect(responseOne.body).toHaveProperty("message", "User deleted");
  });
});
