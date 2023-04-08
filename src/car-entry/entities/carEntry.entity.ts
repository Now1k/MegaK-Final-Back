import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Car } from "../../cars/entities/car.entity";

enum TypeOfEntry {
  service = 'Workshop service',
  fuel = 'Refueling',
  appearance = 'Appearance service',
}

@Entity()
export class CarEntry {
  @PrimaryGeneratedColumn('uuid')
  entryId: string;

  @Column({ length: 50 })
  name: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @Column()
  type: TypeOfEntry;

  @Column()
  mileage: number;

  @Column({ type: 'text' })
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @ManyToOne(() => Car, (car) => car.entry)
  car: Car;
}
