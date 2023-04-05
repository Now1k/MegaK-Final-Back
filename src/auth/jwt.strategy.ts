import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";
import { UserService } from "../user/user.service";

export interface JwtPayload {
  id: string;
}

function cookieExtractor(req: any): null | string {
  return req?.cookies ? req.cookies?.jwt ?? null : null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey:
        "bdfGRE%YtWT$#%yetr43T%Y$^URYj4t3%^Y^$Etrw435$Y^URYte534^UR%&TIKgye53^$URYIJewyreuyrJey536U$ERYt53y4u6rYIUKJey53u6$RYJtey53u64RYJtey53u46RYJey534U^IR&Yey53U^$RIYey53yu6$RYe35u64E35yu4^Re34265ue4^R35yu46riUeyw435u46R",
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
