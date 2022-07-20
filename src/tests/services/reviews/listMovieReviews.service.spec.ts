import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Review } from "../../../entities/review.entity";
import createMovieService from "../../../services/movies/createMovie.service";
import createReviewService from "../../../services/reviews/createReview.service";
import listMovieReviewsService from "../../../services/reviews/listMovieReviews.service";
import request from "supertest";
import app from "../../../app";

describe("Create an review", () => {
  let connection: DataSource;
  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) => {
        console.error("Error during Data Source initialization", err);
      });
  });
  afterAll(async () => {
    const movieRepository = AppDataSource.getRepository(Review);
    await movieRepository.createQueryBuilder().delete().from(Review).execute();
    await connection.destroy();
  });
  const movieInfo = {
    title: "teste",
    release_year: 1000,
    synopse: "turma5",
    image_url: "llll",
  };

  const reviewInfo = {
    title: "capstone",
    description: "xxxxxx",
    rating: 5,
  };

  const user = {
    user_name: "teste1",
    email: "teste@email.com",
    password: "1234",
    is_adm: true,
  };

  test("Should list all reviews of one movie  ", async () => {
    const movie = await createMovieService(movieInfo);
    const movie_id = movie.id;

    const response = await request(app).post("/users").send(user);
    const user_id = response.body.id;

    const { title, description, rating } = reviewInfo;

    const review = await createReviewService({
      title,
      description,
      rating,
      movie_id,
      user_id,
    });
    const ListMovieReview = await listMovieReviewsService(movie_id);

    expect(ListMovieReview?.reviews).toHaveProperty("map");
  });
});
