import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  user_id: string;

  // @OneToMany(() => Review, review => review.user)
  // review: Review[];

  @Column({ length: 50 })
  user_name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ select: false, length: 128 })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @Column("bool")
  is_adm: boolean;

  constructor() {
    if (!this.user_id) {
      this.user_id = uuidv4();
    }
  }
}
