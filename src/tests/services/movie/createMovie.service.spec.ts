import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { AppError } from "../../../errors/appError";
import { v4 as uuidv4 } from "uuid";
import createMovieService from "../../../services/movies/createMovie.service";
import deleteMovieService from "../../../services/movies/deletemovie.service";
import { Movie } from "../../../entities/movie.entity";

describe("Create movie", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });

  afterAll(async () => {
    const movieRepository = AppDataSource.getRepository(Movie);
    await movieRepository.createQueryBuilder().delete().from(Movie).execute();
    await connection.destroy();
  });

  test("Should insert the information of the new user in the database", async () => {
    const title = "Cisco";
    const release_year = 2022;
    const synopse = "lalalalala";
    const image_url = "http://";

    const movieData = { title, release_year, synopse, image_url };
    const newMovie = await createMovieService(movieData);

    expect(newMovie).toHaveProperty("id");
    expect(newMovie.title).toBe("Cisco");
    expect(newMovie.release_year).toBe(2022);
    expect(newMovie.synopse).toBe("lalalalala");
    expect(newMovie.image_url).toBe("http://");
  });

  test("Should be able to thown an error in case of user not found", async () => {
    try {
      const userId = uuidv4();
      await deleteMovieService(userId);
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe("Movie not found");
      }
    }
  });
});
