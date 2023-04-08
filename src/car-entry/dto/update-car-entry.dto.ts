import { PartialType } from "@nestjs/mapped-types";
import { CreateCarEntryDto } from "./create-car-entry.dto";
import { IsEnum, IsNumber, IsOptional, IsString, Length, Max, MaxLength, Min, MinLength } from "class-validator";
import { TypeOfEntry } from "../types/typeOfEntry.enum";

export class UpdateCarEntryDto extends PartialType(CreateCarEntryDto) {
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(50)
  name?: string;

  @IsOptional()
  @IsEnum(TypeOfEntry)
  type?: TypeOfEntry;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000000)
  mileage?: number;

  @IsOptional()
  @IsString()
  @Length(1, 500)
  description?: string;

  @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10000000)
  cost?: number;
}
