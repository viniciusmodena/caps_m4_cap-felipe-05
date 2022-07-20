import { DataSource } from "typeorm";
import { AppDataSource } from "../../data-source";
import app from "../../app";
import request from "supertest";
import { Genre } from "../../entities/genre.entity";
import createGenreService from "../../services/genres/createGenre.service";
const testGenre1 = "teste 1 list";
const testGenre2 = "teste 2 list";
const testGenre3 = "teste 3 list";
describe("Tests for route /genres, list", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
    await createGenreService(testGenre1);
    await createGenreService(testGenre2);
    await createGenreService(testGenre3);
  });
  afterAll(async () => {
    const genreRepository = AppDataSource.getRepository(Genre);
    await genreRepository.createQueryBuilder().delete().from(Genre).execute();
    connection.destroy();
  });
  test("Should list movies by genre", async () => {
    const response = await request(app).get("/genres");
    expect(response.status).toEqual(200);
    expect(response.body.length).toEqual(3);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: testGenre1,
          id: response.body[0].id,
        }),
        expect.objectContaining({
          name: testGenre2,
          id: response.body[1].id,
        }),
        expect.objectContaining({
          name: testGenre3,
          id: response.body[2].id,
        }),
      ])
    );
  });
});
