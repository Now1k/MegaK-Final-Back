import { PartialType } from "@nestjs/mapped-types";
import { AddCarDto } from "./add-car.dto";

export class UpdateCarDto extends PartialType(AddCarDto) {
  brand?: string;
  model?: string;
  year_of_production?: number;
}
