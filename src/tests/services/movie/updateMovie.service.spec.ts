import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Movie } from "../../../entities/movie.entity";
import createMovieService from "../../../services/movies/createMovie.service";
import updateMovieService from "../../../services/movies/updateMovie.service";

describe("Update a movie", () => {
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

  test("Should update a movie", async () => {
    const movie = await createMovieService(movieData);
    const newMovieData = {
      title: "title2",
      release_year: 2021,
      synopse: "era uma vez",
      image_url: "https://",
    };
    const { title, release_year, synopse, image_url } = newMovieData;
    const movieUptaded = await updateMovieService(
      movie.id,
      title,
      release_year,
      synopse,
      image_url
    );

    expect(movieUptaded).toEqual({
      id: movie.id,
      title,
      release_year,
      synopse,
      image_url,
    });
  });
});
