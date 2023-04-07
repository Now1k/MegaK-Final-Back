import { IsNumber, IsString } from "class-validator";

export class AddCarDto {
  @IsString()
  brand: string;

  @IsString()
  model: string;

  @IsNumber()
  year_of_production: number;
}
