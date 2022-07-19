import { DataSource } from 'typeorm'
import { AppDataSource } from '../../data-source'
import { IGenre } from '../../interfaces/genre'
import app from '../../app'
import request from 'supertest'
import { Genre } from '../../entities/genre.entity'
import { IUser } from '../../interfaces/user'
import supertest from 'supertest'
import { User } from '../../entities/user.entity'

const genre: IGenre = {
  name: 'gente test',
}

const tooLargeGenre: IGenre = {
  name: 'comedyaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
}

const user: IUser = {
  user_name: 'user test',
  email: 'usertest@email.com',
  password: '12345',
  is_adm: true,
}

describe('Tests for route /genres, create', () => {
  let connection: DataSource
  let token: string

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res
      })
      .catch((err) => {
        console.error('Error during Data Source initialization', err)
      })

      await request(app).post('/users').send(user)
      const response = await request(app).post('/login').send(user)
      token = response.body.token
  })

  afterAll(async () => {
    const genreRepository = AppDataSource.getRepository(Genre)
    const userRepository = AppDataSource.getRepository(User)
    
    await genreRepository.createQueryBuilder().delete().from(Genre).execute()
    await userRepository.createQueryBuilder().delete().from(User).execute()
  })


  test('Should be able to create genre', async () => {
    const response = await supertest(app)
      .post('/genres')
      .set('Authorization', `Bearer ${token}`)
      .send(genre)

    expect(response.status).toEqual(201)
    expect(response.body).toHaveProperty("id")
  })

  test('Should not be able to create a genre with the same name', async () => {
    const response = await request(app)
      .post('/genres')
      .set('Authorization', `Bearer ${token}`)
      .send(genre)

    expect(response.body.message).toEqual("Genre already exists")
  })

  test('Should not allow to create genre with names over 50 characters', async () => {
    const response = await request(app)
      .post('/genres')
      .set('Authorization', `Bearer ${token}`)
      .send(tooLargeGenre)

    expect(response.body.message).toEqual('name must be at most 50 characters')
  })

})
