import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Review } from "./review.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @Column({ length: 50 })
  user_name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ select: false, length: 128 })
  password?: string;

  @CreateDateColumn()
  created_at: Date;

  @Column("bool")
  is_adm: boolean;
}
