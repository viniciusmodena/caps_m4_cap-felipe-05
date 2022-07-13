import { Entity, ManyToOne } from "typeorm";
import { Genre } from "./genre.entity";
import { Movies } from "./movies.entity";

@Entity("movies_genres")
class Movies_Genres {
  @ManyToOne(() => Movies)
  movie: Movies;

  @ManyToOne(() => Genre)
  genre: Genre;
}

export { Movies_Genres };
