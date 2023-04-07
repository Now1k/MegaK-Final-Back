import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Car } from "../../cars/entities/car.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  userId: string;

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

  @OneToMany(() => Car, (car) => car.user)
  cars: Car[];
}
