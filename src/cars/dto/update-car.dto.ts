import { PartialType } from "@nestjs/mapped-types";
import { AddCarDto } from "./add-car.dto";
import { IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class UpdateCarDto extends PartialType(AddCarDto) {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  brand?: string;

  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(70)
  model?: string;

  @IsOptional()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  year_of_production?: number;
}
