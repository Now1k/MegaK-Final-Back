import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user/entities/user.entity";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "",
      database: "megak_final_car_manager",
      entities: [User],
      autoLoadEntities: true,
      logging: true,
      synchronize: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".development.env",
    }),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
