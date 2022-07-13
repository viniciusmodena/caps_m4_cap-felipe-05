import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { Movie } from "./movie.entity";

@Entity("reviews")
export class Review {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 1000 })
  description: string;

  @Column({ type: "integer" })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @OneToOne(() => User, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @OneToOne(() => Movie, { onDelete: "CASCADE" })
  @JoinColumn({ name: "movie_id" })
  movie: Movie;
}
