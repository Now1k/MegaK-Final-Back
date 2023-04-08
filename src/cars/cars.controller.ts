import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CarsService } from "./cars.service";
import { AddCarDto } from "./dto/add-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { UserObj } from "../decorators/user-obj.decorator";
import { User } from "../user/entities/user.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @Post('/add/:userId')
  @UseGuards(AuthGuard('jwt'))
  addCar(@Param('userId') userId: string, @Body() AddCarDto: AddCarDto) {
    return this.carsService.addCar(userId, AddCarDto);
  }

  @Get('/all')
  @UseGuards(AuthGuard('jwt'))
  findAll(@UserObj() user: User) {
    console.log(user);
    return this.carsService.findAll();
  }

  @Get('/one/:carId')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('carId') carId: string) {
    return this.carsService.findOne(carId);
  }

  @Patch('/update/:carId')
  @UseGuards(AuthGuard('jwt'))
  update(@Param('carId') carId: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.update(carId, updateCarDto);
  }

  @Delete('/delete/:carId')
  @UseGuards(AuthGuard('jwt'))
  remove(@Param('carId') carId: string) {
    return this.carsService.remove(carId);
  }
}
