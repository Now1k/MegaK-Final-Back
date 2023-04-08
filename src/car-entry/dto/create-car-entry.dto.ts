import { TypeOfEntry } from "../types/typeOfEntry.enum";
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Max,
  MaxLength,
  Min,
  MinLength,
} from "class-validator";

export class CreateCarEntryDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEnum(TypeOfEntry)
  type: TypeOfEntry;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage: number;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  description?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10000000)
  cost: number;
}
