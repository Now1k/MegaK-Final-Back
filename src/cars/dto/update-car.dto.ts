import { PartialType } from "@nestjs/mapped-types";
import { AddCarDto } from "./add-car.dto";
import { IsNumber, IsString } from "class-validator";

export class UpdateCarDto extends PartialType(AddCarDto) {
  @IsString()
  brand?: string;

  @IsString()
  model?: string;

  @IsNumber()
  year_of_production?: number;
}
