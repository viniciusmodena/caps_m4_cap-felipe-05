import { Router } from 'express'
import { addGenreToMovieController, createGenreController, listMoviesByGenreController } from '../controllers/genre.controllers'

const genreRouter = Router()

genreRouter.post('', createGenreController)
genreRouter.post('/movie/:movieId', addGenreToMovieController)
genreRouter.get('/:genreId', listMoviesByGenreController)

export default genreRouter