import { Router } from 'express'
import {
  addGenreToMovieController,
  createGenreController,
  deleteGenreController,
  listGenreController,
  listMoviesByGenreController,
} from '../controllers/genre.controllers'

const genreRouter = Router()

genreRouter.post('', createGenreController)
genreRouter.post('/movie/:movieId', addGenreToMovieController)
genreRouter.get('/:genreId', listMoviesByGenreController)
genreRouter.get('', listGenreController)
genreRouter.delete('/:genreId', deleteGenreController)

export default genreRouter
