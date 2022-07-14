import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";

import { Genre } from "./genre.entity";
import { Review } from "./review.entity";

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  title: string;

  @Column()
  release_year: number;

  @Column()
  synopse: string;

  @Column()
  image_url: string;

  @OneToMany(() => Review, (review) => review.movie)
  review: Review[];

  @ManyToMany(() => Genre, (genre) => genre.movies)
  @JoinTable()
  genres: Genre[];
}
