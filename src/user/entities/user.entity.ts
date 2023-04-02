import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentToken: string | null;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;

  @Column({
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;
}
