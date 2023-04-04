import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "./Dto/auth-login.dto";
import { Response } from "express";
import { UserService } from "../user/user.service";
import { hashPwd } from "../utils/hash-pwd";
import { JwtPayload } from "./jwt.strategy";
import { sign } from "jsonwebtoken";
import { User } from "../user/entities/user.entity";
import { v4 as uuid } from "uuid";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await this.userService.loginFind({
        email: req.email,
        pwd: hashPwd(req.pwd),
      });

      if (!user) {
        return res.json({ error: "Invalid login data!" });
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie("jwt", token.accessToken, {
          secure: false,
          domain: "localhost",
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  private createToken(currentToken: string): {
    accessToken: string;
    expiresIn: number;
  } {
    const payload: JwtPayload = { id: currentToken };
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, this.configService.get("SECRET_OR_KEY"), {
      expiresIn,
    });

    return {
      accessToken,
      expiresIn,
    };
  }

  private async generateToken(user: User): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid();
      userWithThisToken = await this.userService.findByToken({
        currentToken: token,
      });
    } while (!!userWithThisToken);

    user.currentToken = token;
    await this.userService.update(user.id, { currentToken: user.currentToken });

    return token;
  }
}
