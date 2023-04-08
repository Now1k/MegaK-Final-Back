import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { CarEntryService } from "./car-entry.service";
import { CreateCarEntryDto } from "./dto/create-car-entry.dto";
import { UpdateCarEntryDto } from "./dto/update-car-entry.dto";

@Controller('car-entry')
export class CarEntryController {
  constructor(private readonly carEntryService: CarEntryService) {}

  @Post()
  create(@Body() createCarEntryDto: CreateCarEntryDto) {
    return this.carEntryService.create(createCarEntryDto);
  }

  @Get()
  findAll() {
    return this.carEntryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carEntryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCarEntryDto: UpdateCarEntryDto,
  ) {
    return this.carEntryService.update(+id, updateCarEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carEntryService.remove(+id);
  }
}
