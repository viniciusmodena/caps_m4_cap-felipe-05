// import { DataSource } from 'typeorm'
// import { AppDataSource } from '../../data-source'
// import { IGenre } from '../../interfaces/genre'
// import app from '../../app'
// import request from 'supertest'
// import { Genre } from '../../entities/genre.entity'

// describe('Tests for route /genres, create', () => {
//   let connection: DataSource

//   const genre: IGenre = {
//     name: 'genre test delete'
//   }

//   beforeAll(async () => {
//     await AppDataSource.initialize()
//       .then((res) => {
//         connection = res
//       })
//       .catch((err) => {
//         console.error('Error during Data Source initialization', err)
//       })

//   })

//   afterAll(async () => {
//     const genreRepository = AppDataSource.getRepository(Genre)
//     await genreRepository.createQueryBuilder().delete().from(Genre).execute()

//     await connection.destroy()
//   })


// })
