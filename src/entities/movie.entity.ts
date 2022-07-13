import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { v4 as uuid } from "uuid";

@Entity("movie")
export class Movie {
  @PrimaryGeneratedColumn("uuid")
  readonly id: string;

  @Column()
  title: string;

  @Column()
  release_year: number;

  @Column()
  sypnose: string;

  @Column()
  image_url: string;
  // colocar onetomany
}
