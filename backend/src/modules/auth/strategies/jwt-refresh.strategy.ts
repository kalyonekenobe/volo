import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from 'src/modules/user/user.service';
import { JwtTokenPayload } from 'src/modules/auth/types/auth.types';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';
import { ConfigService } from '@nestjs/config';
import { ConfigVariables } from 'src/core/enums/app.enums';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) =>
          request.cookies[
            configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
              'Volo-Refresh-Token'
          ],
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(ConfigVariables.JwtSecret),
      passReqToCallback: true,
    });
  }

  public async validate(request: Request, payload: JwtTokenPayload): Promise<UserPublicEntity> {
    const refreshToken =
      request.cookies[
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Volo-Refresh-Token'
      ];

    return await this.userService.findOne({
      where: { id: payload.userId.toString(), refreshToken },
    });
  }
}
