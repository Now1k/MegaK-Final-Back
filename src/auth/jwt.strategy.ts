import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";
import { ConfigService } from "@nestjs/config";

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req?.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: configService.get("SECRET_OR_KEY"),
    });
  }

  async validate(payload: JwtPayload, done: (error, user) => void) {
    if (!payload || !payload.id) {
      return done(new UnauthorizedException("Nie ma tokena"), false);
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = await this.userService.findOne({
      currentToken: payload.id,
    });

    if (!user) {
      return done(new UnauthorizedException("Nie znalazł użytkownika"), false);
    }
    done(null, user);
  }
}
