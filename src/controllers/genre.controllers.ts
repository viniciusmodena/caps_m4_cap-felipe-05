import { Request, Response } from 'express'
import addGenreToMovieService from '../services/genres/addGenreToMovie.service'
import createGenreService from '../services/genres/createGenre.service'
import listMoviesByGenreService from '../services/genres/listMoviesByGenre.service'

export const createGenreController = async (req: Request, res: Response) => {
  const { name } = req.body

  const genre = await createGenreService(name)

  res.status(201).json(genre)
}

export const addGenreToMovieController = async (
  req: Request,
  res: Response
) => {
  const { genreId } = req.body
  const { movieId } = req.params

  const addGenre = await addGenreToMovieService({ movieId, genreId })

  res.json(addGenre)
}

export const listMoviesByGenreController = async (req: Request, res: Response) => {
  const {genreId} = req.params

  const genre = await listMoviesByGenreService(genreId)

  res.json(genre)
}
