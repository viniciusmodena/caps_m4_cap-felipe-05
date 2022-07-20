import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Movie } from "../../../entities/movie.entity";
import createMovieService from "../../../services/movies/createMovie.service";
import listOneMovieService from "../../../services/movies/listOneMovie.service";

describe("List a movie", () => {
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

  const movieData = {
    title: "teste",
    release_year: 2022,
    synopse: "turma5",
    image_url: "llll",
  };

  test("Should list all movies  ", async () => {
    const movie = await createMovieService(movieData);
    const listAMovie = await listOneMovieService(movie.id);

    expect(listAMovie.id).toEqual(movie.id);
  });
});
