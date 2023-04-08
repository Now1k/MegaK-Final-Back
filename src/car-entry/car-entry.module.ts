import { Module } from "@nestjs/common";
import { CarEntryService } from "./car-entry.service";
import { CarEntryController } from "./car-entry.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarEntry } from "./entities/carEntry.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CarEntry])],
  controllers: [CarEntryController],
  providers: [CarEntryService],
})
export class CarEntryModule {}
