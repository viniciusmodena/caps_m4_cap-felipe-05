import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";

@Entity("genres")
export class Genres {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  //   @OneToMany(() => movieGenres => genre.id)

  @Column({ length: 50 })
  name: string;
}
