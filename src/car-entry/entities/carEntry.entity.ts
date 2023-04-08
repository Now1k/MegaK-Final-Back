import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Car } from "../../cars/entities/car.entity";
import { TypeOfEntry } from "../types/typeOfEntry.enum";

@Entity()
export class CarEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column()
  type: TypeOfEntry;

  @Column()
  mileage: number;

  @Column({ type: 'text' })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Car, (car) => car.entry)
  car: string;
}
