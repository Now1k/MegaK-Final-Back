import { Injectable } from "@nestjs/common";
import { CreateCarEntryDto } from "./dto/create-car-entry.dto";
import { UpdateCarEntryDto } from "./dto/update-car-entry.dto";

@Injectable()
export class CarEntryService {
  create(createCarEntryDto: CreateCarEntryDto) {
    return 'This action adds a new carEntry';
  }

  findAll() {
    return `This action returns all carEntry`;
  }

  findOne(id: number) {
    return `This action returns a #${id} carEntry`;
  }

  update(id: number, updateCarEntryDto: UpdateCarEntryDto) {
    return `This action updates a #${id} carEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} carEntry`;
  }
}
