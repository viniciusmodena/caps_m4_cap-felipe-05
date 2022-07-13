import { Entity, ManyToOne } from 'typeorm'
import { Movies } from './movies.entity'
import { Genres } from './movies_genres'

@Entity('movies_genres')
class Movies_Genres {
  @ManyToOne(() => Movies)
  movie: Movies

  @ManyToOne(() => Genres)
  genre: Genres
}

export { Movies_Genres }
