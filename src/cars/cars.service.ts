import { Injectable } from "@nestjs/common";
import { AddCarDto } from "./dto/add-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Car } from "./entities/car.entity";
import { Repository } from "typeorm";

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
  ) {}

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
