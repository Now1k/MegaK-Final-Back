import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CarEntry } from "../../car-entry/entities/carEntry.entity";
import { User } from "../../user/entities/user.entity";

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.car)
  user: User;

  @OneToMany(() => CarEntry, (entry) => entry.car)
  entry: CarEntry[];
}
