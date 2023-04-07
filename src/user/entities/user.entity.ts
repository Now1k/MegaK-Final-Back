import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({
    length: 75,
  })
  email: string;

  @Column({
    length: 512,
  })
  password: string;

  @Column({
    nullable: true,
    default: null,
  })
  currentToken: string | null;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    nullable: true,
    default: null,
  })
  car_id: string | null;
}
