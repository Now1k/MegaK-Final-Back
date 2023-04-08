import { Car } from "src/cars/entities/car.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Car, (car) => car.user)
  car: Car[];
}
