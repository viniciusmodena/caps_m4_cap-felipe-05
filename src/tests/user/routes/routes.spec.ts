import request from "supertest";
import app from "../../../app";
import { DataSource, Unique } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { User } from "../../../entities/user.entity";
import createSessionService from "../../../services/sessions/createSession.service";
import { IUser } from "../../../interfaces/user";

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

  test("Should not be able to create a user with the same email as other already registered.", async () => {
    const user_name = "teste_integration";
    const email = "teste_integration@mail.com";
    const password = "1234";
    const is_adm = true;

    const userData = { user_name, email, password, is_adm };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "Email already exists",
      })
    );
  });

  test("Should not be able to create a user with a password with less than 4 characters.", async () => {
    const user_name = "test_password3chars";
    const email = "test_password3chars@mail.com";
    const password = "123";
    const is_adm = true;

    const userData = { user_name, email, password, is_adm };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "password must be at least 4 characters",
      })
    );
  });

  test("Should not be able to create a user with a password with more than 12 characters.", async () => {
    const user_name = "test_password3chars";
    const email = "test_password3chars@mail.com";
    const password = "123456789abcd";
    const is_adm = true;

    const userData = { user_name, email, password, is_adm };

    const response = await request(app).post("/users").send(userData);

    expect(response.status).toBe(400);

    expect(response.body).toEqual(
      expect.objectContaining({
        message: "password must be at most 12 characters",
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

  test("Should not be able to update a specifc user without authorization.", async () => {
    const response = await request(app).get("/users");
    const id = response.body[0].id;
    const user_name = "fulano";

    const userData = { user_name };

    const responseOne = await request(app).patch(`/users/${id}`).send(userData);

    expect(responseOne.status).toBe(401);

    expect(responseOne.body).toEqual(
      expect.objectContaining({
        message: "Invalid token",
      })
    );
  });

  test("Should not be able to update a specifc user without being the same user or administrator.", async () => {
    const not_adm_owner_user_name = "not_adm_owner_user";
    const not_adm_owner_email = "not_adm_user@mail.com";
    const not_adm_owner_password = "1234";
    const not_adm_owner_is_adm = false;

    const not_adm_owner_userData = {
      user_name: not_adm_owner_user_name,
      email: not_adm_owner_email,
      password: not_adm_owner_password,
      is_adm: not_adm_owner_is_adm,
    };

    await request(app).post("/users").send(not_adm_owner_userData);

    const email = not_adm_owner_email;
    const password = not_adm_owner_password;
    const token = await createSessionService({ email, password });

    const listUsersResponse = await request(app).get("/users");
    const id = listUsersResponse.body[0].id;

    const user_name = "fulano";
    const userData = { user_name };

    const updateResponse = await request(app)
      .patch(`/users/${id}`)
      .send(userData)
      .set("Authorization", `bearer: ${token}`);

    expect(updateResponse.status).toBe(401);

    expect(updateResponse.body).toEqual(
      expect.objectContaining({
        message: "Unauthorized",
      })
    );
  });

  test("Should be able to update a specifc user", async () => {
    const email = "teste_integration@mail.com";
    const password = "1234";
    const token = await createSessionService({ email, password });

    const response = await request(app).get("/users");
    const id = response.body[0].id;
    const user_name = "fulano";

    const userData = { user_name };

    const responseOne = await request(app)
      .patch(`/users/${id}`)
      .send(userData)
      .set("Authorization", `bearer: ${token}`);

    expect(responseOne.status).toBe(200);

    expect(responseOne.body).toHaveProperty("user_name", user_name);
  });

  test("Should not be able to delete a specific user without authorization", async () => {
    const response = await request(app).get("/users");
    const id = response.body[0].id;

    const responseOne = await request(app).delete(`/users/${id}`);

    expect(responseOne.status).toBe(401);
  });

  test("Should be able to delete a specific user", async () => {
    const email = "teste_integration@mail.com";
    const password = "1234";
    const token = await createSessionService({ email, password });

    const response = await request(app).get("/users");
    const id = response.body.find((user: IUser) => user.email === email).id;

    const responseOne = await request(app)
      .delete(`/users/${id}`)
      .set("Authorization", `bearer: ${token}`);

    expect(responseOne.status).toBe(200);
  });
});
