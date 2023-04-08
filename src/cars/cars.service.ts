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

  async addCar(userId: string, createCarDto: AddCarDto) {
    const newCar = new Car();
    newCar.brand = createCarDto.brand;
    newCar.model = createCarDto.model;
    newCar.year_of_production = createCarDto.year_of_production;
    newCar.user = userId;
    await this.carsRepository.save(newCar);
    return newCar;
  }

  async findAll() {
    return await this.carsRepository.find();
  }

  async findOne(carId: string) {
    return this.carsRepository.findOne({ where: { id: carId } });
  }

  async update(id: string, updateCarDto: UpdateCarDto) {
    return await this.carsRepository
      .createQueryBuilder()
      .update('car')
      .set(updateCarDto)
      .where('id = :id', { id })
      .execute();
  }

  async remove(carId: string) {
    await this.carsRepository.delete(carId);
    return `Car of id ${carId} was deleted`;
  }
}
