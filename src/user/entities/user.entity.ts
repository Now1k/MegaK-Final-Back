import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  email: string;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
