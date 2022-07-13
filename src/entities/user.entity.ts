import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  Unique,
} from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity()
@Unique("email")
export class User {
  @PrimaryColumn("uuid")
  user_id: string;

  // @OneToMany(() => Review, review => review.user)
  // review: Review[];

  @Column({ length: 50 })
  user_name: string;

  @Column({ length: 50 })
  email: string;

  @Column({ select: false, length: 128 })
  password: string;

  @CreateDateColumn()
  user_since: Date;

  @Column("bool")
  is_adm: boolean;
}
