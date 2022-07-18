import { DataSource } from 'typeorm'
import { AppDataSource } from '../../data-source'
import app from '../../app'
import request from 'supertest'
import { IGenre } from '../../interfaces/genre'
import { Genre } from '../../entities/genre.entity'

const testGenre1: IGenre = {
  name: 'test 1',
}

const testGenre2: IGenre = {
  name: 'test 2',
}

const testGenre3: IGenre = {
  name: 'test 3',
}

describe('Tests for route /genres, list', () => {
  let connection: DataSource

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })

    await request(app).post('/genres').send(testGenre1)
    await request(app).post('/genres').send(testGenre2)
    await request(app).post('/genres').send(testGenre3)
  })

  afterAll(async () => {
    const genreRepository = AppDataSource.getRepository(Genre)
    await genreRepository.createQueryBuilder().delete().from(Genre).execute()

    await connection.destroy()
  })

  test('Should list genres', async () => {
    const response = await request(app).get('/genres')

    expect(response.status).toEqual(200)
    expect(response.body.length).toEqual(3)
    expect(Array.isArray(response.body)).toBe(true)
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        ...testGenre1,
        id: response.body[0].id
      }), expect.objectContaining({
        ...testGenre2,
        id: response.body[1].id
      }), expect.objectContaining({
        ...testGenre3,
        id: response.body[2].id
      })
    ]))
  })

})
