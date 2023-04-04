import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { JwtStrategy } from "./jwt.strategy";
import { UserModule } from "../user/user.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [JwtStrategy],
})
export class AuthModule {
}
