import { DataSource } from "typeorm";
import { AppDataSource } from "../../../data-source";
import { Review } from "../../../entities/review.entity";
import createReviewService from "../../../services/reviews/createReview.service";
import request from "supertest";
import { AppError } from "../../../errors/appError";
import app from "../../../app";
import createMovieService from "../../../services/movies/createMovie.service";

const user = {
  user_name: "teste1",
  email: "teste@email.com",
  password: "1234",
  is_adm: true,
};

const movie = {
  title: "filme 1",
  release_year: 2001,
  synopse: "uma synopse",
  image_url: "link da imagem",
};

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

  test("Should insert the information of the new user in the database", async () => {
    await request(app).post("/users").send(user);
    const response = await request(app).post("/login").send(user);
    const user_id = response.body.id;
    const res = await createMovieService(movie);
    const movie_id = res.id;

    const reviewData = {
      title: "title",
      description: "description",
      rating: 5,
      movie_id,
      user_id,
    };

    const newReview = await createReviewService(reviewData);

    expect(newReview).toHaveProperty("id");
    expect(newReview.title).toBe("title");
    expect(newReview.description).toBe("description");
    expect(newReview.rating).toBe(5);
  });

  test("Should be able to thown an error in case of user not found", async () => {
    try {
      const res = await createMovieService(movie);

      const reviewData = {
        user_id: "1lmclskdvnskncvslc",
        title: "title",
        description: "description",
        rating: 5,
        movie_id: res.id,
      };

      await createReviewService(reviewData);
    } catch (error) {
      if (error instanceof AppError) {
        expect(error.message).toBe("Review not found");
      }
    }
  });
});
