import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("genres")
export class Genre {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;
}
