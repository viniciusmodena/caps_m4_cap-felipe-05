import { DataSource } from 'typeorm'
import { AppDataSource } from '../../data-source'
import app from '../../app'
import request from 'supertest'
import { Genre } from '../../entities/genre.entity'
import createGenreService from '../../services/genres/createGenre.service'
import { IMovie } from '../../interfaces/movie'
import createMovieService from '../../services/movies/createMovie.service'
import addGenreToMovieService from '../../services/genres/addGenreToMovie.service'
import { Movie } from '../../entities/movie.entity'

const testGenre1: string = 'teste  genre'
let movie1Id: string
let movie2Id: string
let movie3Id: string

const movie1: IMovie = {
  title: 'filme 1',
  release_year: 2001,
  synopse: 'uma synopse',
  image_url: 'link da imagem',
}

const movie2: IMovie = {
  title: 'filme 2',
  release_year: 2001,
  synopse: 'uma synopse',
  image_url: 'link da imagem',
}

const movie3: IMovie = {
  title: 'filme 3',
  release_year: 2001,
  synopse: 'uma synopse',
  image_url: 'link da imagem',
}

describe('Tests for route /genres, list movie by genre', () => {
  let connection: DataSource
  let genreId: string

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })

    const genreResponse = await createGenreService(testGenre1)
    genreId = genreResponse.id

    const movie1Response = await createMovieService(movie1)
    const movie2Response = await createMovieService(movie2)
    const movie3Response = await createMovieService(movie3)
    movie1Id = movie1Response.id
    movie2Id = movie2Response.id
    movie3Id = movie3Response.id

    let genreList = [testGenre1]

    let movieId = movie1Id
    await addGenreToMovieService({ movieId, genreList })
    movieId = movie2Id
    await addGenreToMovieService({ movieId, genreList })
    movieId = movie3Id
    await addGenreToMovieService({ movieId, genreList })
  })

  afterAll(async () => {
    const movieRepository = AppDataSource.getRepository(Movie)
    const genreRepository = AppDataSource.getRepository(Genre)

    await movieRepository.createQueryBuilder().delete().from(Movie).execute()
    await genreRepository.createQueryBuilder().delete().from(Genre).execute()

    connection.destroy()
  })

  test('Should list movies by genre', async () => {
    const response = await request(app).get(`/genres/${genreId}`)

    expect(response.status).toEqual(200)
    expect(response.body.movies.length).toEqual(3)
    expect(Array.isArray(response.body.movies)).toBe(true)
    expect(response.body.movies).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...movie1,
          id: movie1Id,
        }),
        expect.objectContaining({
          ...movie2,
          id: movie2Id,
        }),
        expect.objectContaining({
          ...movie3,
          id: movie3Id,
        }),
      ])
    )
  })
})
