import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ConfigVariables } from 'src/core/enums/app.enums';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/auth.service';
import { OAuth2Controller } from 'src/modules/auth/oauth2.controller';
import { JwtRefreshStrategy } from 'src/modules/auth/strategies/jwt-refresh.strategy';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { UserService } from 'src/modules/user/user.service';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ConfigVariables.JwtSecret),
        signOptions: {
          audience: configService.get<string>(ConfigVariables.JwtAudience),
          issuer: configService.get<string>(ConfigVariables.JwtIssuer),
          expiresIn: configService.get<string>(ConfigVariables.JwtAccessTokenDuration),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController, OAuth2Controller],
  providers: [
    UserService,
    ConfigService,
    LocalStrategy,
    JwtStrategy,
    JwtRefreshStrategy,
    AuthService,
  ],
})
export class AuthModule {}
