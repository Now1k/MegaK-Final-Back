import { Injectable } from "@nestjs/common";
import { CreateCarEntryDto } from "./dto/create-car-entry.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CarEntry } from "./entities/carEntry.entity";
import { Repository } from "typeorm";
import { UpdateCarEntryDto } from "./dto/update-car-entry.dto";

@Injectable()
export class CarEntryService {
  constructor(
    @InjectRepository(CarEntry)
    private carEntryRepository: Repository<CarEntry>,
  ) {}

  async create(carId: string, createCarEntryDto: CreateCarEntryDto) {
    const newEntry = new CarEntry();
    newEntry.name = createCarEntryDto.name;
    newEntry.type = createCarEntryDto.type;
    newEntry.mileage = createCarEntryDto.mileage;
    newEntry.description = createCarEntryDto.description;
    newEntry.cost = createCarEntryDto.cost;
    newEntry.car = carId;
    await this.carEntryRepository.save(newEntry);
    return newEntry;
  }

  async findAll(carId: string) {
    return await this.carEntryRepository
      .createQueryBuilder()
      .select('car_entry')
      .from(CarEntry, 'car_entry')
      .where('car_entry.carId = :carId', { carId })
      .getMany();
  }

  async findOne(entryId: string) {
    return await this.carEntryRepository
      .createQueryBuilder()
      .select('car_entry')
      .from(CarEntry, 'car_entry')
      .where('car_entry.id = :entryId', { entryId })
      .getOne();
  }

  async update(entryId: string, updateCarEntryDto: UpdateCarEntryDto) {
    return this.carEntryRepository
      .createQueryBuilder()
      .update('car_entry')
      .set(updateCarEntryDto)
      .where('car_entry.id = :entryId', { entryId })
      .execute();
  }

  async remove(entryId: string) {
    await this.carEntryRepository.delete(entryId);
    return console.log(`Car entry ${entryId} was deleted.`);
  }
}
