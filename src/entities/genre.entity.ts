import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Movie } from "./movie.entity";

@Entity("genres")
export class Genre {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  movies: Movie[];
}
