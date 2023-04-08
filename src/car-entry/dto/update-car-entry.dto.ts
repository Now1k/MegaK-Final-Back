import { PartialType } from "@nestjs/mapped-types";
import { CreateCarEntryDto } from "./create-car-entry.dto";

export class UpdateCarEntryDto extends PartialType(CreateCarEntryDto) {}
