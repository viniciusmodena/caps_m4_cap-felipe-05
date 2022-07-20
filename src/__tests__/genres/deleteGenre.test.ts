import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import { IGenreResponse } from "../../interfaces/genre";
import app from "../../app";
import request from "supertest";
import { Genre } from "../../entities/genre.entity";
import createGenreService from "../../services/genres/createGenre.service";
import { IUser } from "../../interfaces/user";
import { User } from "../../entities/user.entity";

const testGenre = "teste 1 delete";

const user: IUser = {
  user_name: "user test",
  email: "usertest@email.com",
  password: "12345",
  is_adm: true,
};

describe("Tests for route /genres, delete", () => {
  let connection: DataSource;
  let token: string;
  let genre: IGenreResponse;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });

    await request(app).post("/users").send(user);

    const response = await request(app).post("/login").send(user);
    token = response.body.token;
  });

  afterAll(async () => {
    const genreRepository = AppDataSource.getRepository(Genre);
    const userRepository = AppDataSource.getRepository(User);

    await genreRepository.createQueryBuilder().delete().from(Genre).execute();
    await userRepository.createQueryBuilder().delete().from(User).execute();
  });

  test("Should delete genre", async () => {
    genre = await createGenreService(testGenre);

    const response = await request(app)
      .delete(`/genres/${genre.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(200);
    expect(response.body.message).toEqual("Genre deleted");
  });

  test("Attempt to delete genre that does not exist", async () => {
    const response = await request(app)
      .delete(`/genres/${genre.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual("Genre not found");
  });
});
