import { Injectable } from "@nestjs/common";
import { AddCarDto } from "./dto/add-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { Repository } from "typeorm";
import { AddCarResponse } from "../interfaces/car.interface";

@Injectable()
export class CarsService {
  [x: string]: any;
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

  filter(car: Car): AddCarResponse {
    const { id, brand, model, year_of_production } = car;
    return { id, brand, model, year_of_production };
  }

  async addCar(createCarDto: AddCarDto) {
    return await this.carsRepository
      .createQueryBuilder()
      .insert()
      .into(Car)
      .values([
        {
          brand: createCarDto.brand,
          model: createCarDto.model,
          year_of_production: createCarDto.year_of_production,
        },
      ])
      .execute();
  }

  async findAll() {
    return await this.carsRepository.find();
  }

  async findOne(id: string) {
    return this.carsRepository.findOne({ where: { id } });
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    return await this.carsRepository
      .createQueryBuilder()
      .update('car')
      .set(updateCarDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(id: string) {
    await this.carsRepository.delete(id);
    return `Car of id ${id} was deleted`;
  }
}
