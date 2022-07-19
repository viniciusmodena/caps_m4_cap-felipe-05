import { DataSource } from 'typeorm'
import { AppDataSource } from '../../data-source'
import app from '../../app'
import request from 'supertest'

import createGenreService from '../../services/genres/createGenre.service'
import addGenreToMovieService from '../../services/genres/addGenreToMovie.service'
import createMovieService from '../../services/movies/createMovie.service'
import listMovieService from '../../services/movies/listMovie.service'

import { Genre } from '../../entities/genre.entity'
import { Movie } from '../../entities/movie.entity'

import { IMovie } from '../../interfaces/movie'
import { IUser } from '../../interfaces/user'

const movie: IMovie = {
  title: 'filme 1',
  release_year: 2001,
  synopse: 'uma synopse',
  image_url: 'link da imagem',
}

const user: IUser = {
  user_name: 'user test',
  email: 'usertest@email.com',
  password: '12345',
  is_adm: true,
}

describe('Tests for route /genres, add genres to a movie', () => {
  let connection: DataSource
  let movieId: string
  let genreId1: string
  let genreId2: string
  let token: string

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })

    const movieResponse = await createMovieService(movie)
    movieId = movieResponse.id
    console.log('movieId na criacao: ', movieId)

    await request(app).post('/users').send(user)
    const response = await request(app).post('/login').send(user)
    token = response.body.token

  })
  
  afterAll(async () => {
    const movieRepository = AppDataSource.getRepository(Movie)
    const genreRepository = AppDataSource.getRepository(Genre)
    
    await movieRepository.createQueryBuilder().delete().from(Movie).execute()
    await genreRepository.createQueryBuilder().delete().from(Genre).execute()
    
    connection.destroy()
  })

  test('Should be able to add genres to a movie', async () => {
    const genreList: string[] = ['genre1', 'genre2']

    const genre1Response = await createGenreService(genreList[0])
    const genre2Response = await createGenreService(genreList[1])
    genreId1 = genre1Response.id
    genreId2 = genre2Response.id

    const responseToAdd = await addGenreToMovieService({ movieId, genreList })
    let page = 1
    let limit = 10
    const responseToSearch = await listMovieService({ page, limit })

    expect(responseToAdd).toEqual('Genres added to movie succesfully')
    expect(responseToSearch[0].genres).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: genreId1,
          name: genreList[0],
        }),
        expect.objectContaining({
          id: genreId2,
          name: genreList[1],
        }),
      ])
    )
  })

  test('Attempt to add genre to a movie not in the database', async () => {
    let movieIdFail = 'ed469b9f-9977-4d5d-b654-02719c91b4cf'
    const genreList = { genreList: ['genre1', 'genre2'] }

    const response = await request(app)
      .post(`/genres/movie/${movieIdFail}`)
      .set('Authorization', `Bearer ${token}`)
      .send(genreList)

    expect(response.status).toEqual(404)
    expect(response.body.message).toEqual('Movie not found')
  })

  test('Attempt to add a genre that is not in the database to a movie', async () => {
    const genreList = { genreList: ['fake1', 'fake2'] }

    const response = await request(app)
      .post(`/genres/movie/${movieId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(genreList)

    expect(response.status).toEqual(404)
    expect(response.body.message).toEqual(
      `Genre ${genreList.genreList[0]} not found`
    )
  })
})
