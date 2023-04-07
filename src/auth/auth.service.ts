import { Injectable } from "@nestjs/common";
import { AuthLoginDto } from "./Dto/auth-login.dto";
import { Response } from "express";
import { UserService } from "../user/user.service";
import { hashPwd } from "../utils/hash-pwd";
import { JwtPayload } from "./jwt.strategy";
import { sign } from "jsonwebtoken";
import { User } from "../user/entities/user.entity";
import { v4 as uuid } from "uuid";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await this.userService.loginFind({
        email: req.email,
        pwd: hashPwd(req.pwd),
      });

      if (!user) {
        return res.json({ error: 'Invalid login data!' });
      }

      const token = await this.createToken(await this.generateToken(user));

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ ok: true });
    } catch (e) {
      return res.json({ error: e.message });
    }
  }

  async logout(user: User, res: Response) {
    try {
      user.currentToken = null;
      await this.userService.update(user.userId, {
        currentToken: user.currentToken,
      });
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });

      return res.json({ loggedOut: true });
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
    const accessToken = sign(
      payload,
      'bdfGRE%YtWT$#%yetr43T%Y$^URYj4t3%^Y^$Etrw435$Y^URYte534^UR%&TIKgye53^$URYIJewyreuyrJey536U$ERYt53y4u6rYIUKJey53u6$RYJtey53u64RYJtey53u46RYJey534U^IR&Yey53U^$RIYey53yu6$RYe35u64E35yu4^Re34265ue4^R35yu46riUeyw435u46R',
      {
        expiresIn,
      },
    );

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
    await this.userService.update(user.userId, {
      currentToken: user.currentToken,
    });

    return token;
  }
}
