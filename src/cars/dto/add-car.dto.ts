import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min, MinLength } from "class-validator";

export class AddCarDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  brand: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(70)
  model: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1900)
  @Max(new Date().getFullYear())
  year_of_production: number;
}
