import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { CarsModule } from "./cars/cars.module";
import { Car } from "./cars/entities/car.entity";
import { CarEntry } from "./car-entry/entities/carEntry.entity";
import { CarEntryModule } from "./car-entry/car-entry.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'megak_final_car_manager',
      entities: [User, Car, CarEntry],
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
      // migrations: ["migrations"],
    }),
    UserModule,
    AuthModule,
    CarsModule,
    CarEntryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
