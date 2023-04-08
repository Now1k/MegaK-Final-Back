import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CarEntryService } from "./car-entry.service";
import { CreateCarEntryDto } from "./dto/create-car-entry.dto";
import { UpdateCarEntryDto } from "./dto/update-car-entry.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('car-entry')
export class CarEntryController {
  constructor(private readonly carEntryService: CarEntryService) {}

  @Post('/add/:carId')
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Param('carId') carId: string,
    @Body() createCarEntryDto: CreateCarEntryDto,
  ) {
    return this.carEntryService.create(carId, createCarEntryDto);
  }

  @Get('/all/:carId')
  @UseGuards(AuthGuard('jwt'))
  findAll(@Param('carId') carId: string) {
    return this.carEntryService.findAll(carId);
  }

  @Get('/one/:entryId')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('entryId') entryId: string) {
    return this.carEntryService.findOne(entryId);
  }

  @Patch('update/:entryId')
  @UseGuards(AuthGuard('jwt'))
  update(
    @Param('entryId') entryId: string,
    @Body() updateCarEntryDto: UpdateCarEntryDto,
  ) {
    return this.carEntryService.update(entryId, updateCarEntryDto);
  }

  @Delete('/delete/:entryId')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('entryId') entryId: string) {
    return this.carEntryService.remove(entryId);
  }
}
