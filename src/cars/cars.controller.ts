import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { AddCarDto } from "./dto/add-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post()
  addCar(@Body() AddCarDto: AddCarDto) {
    return this.carsService.create(AddCarDto);
  }

  @Get()
  findAll() {
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(+id, updateCarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.remove(+id);
  }
}
