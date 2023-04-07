import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  carId: string;

  @Column({
    length: 50,
  })
  brand: string;

  @Column({
    length: 55,
  })
  model: string;

  @Column()
  year_of_production: number;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.cars)
  user: User;
}
