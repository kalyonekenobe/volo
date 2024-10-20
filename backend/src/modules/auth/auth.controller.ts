import { Body, Controller, Get, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ConfigVariables, Routes } from 'src/core/enums/app.enums';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';
import { CreateUserDto } from 'src/modules/user/DTO/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Auth } from 'src/core/decorators/auth.decorator';
import {
  LoginResponse,
  RefreshResponse,
  RegisterResponse,
} from 'src/modules/auth/types/auth.types';
import { LoginWithCredentialsDto } from 'src/modules/auth/DTO/login-with-credentials.dto';
import { LoginWithGoogleDto } from 'src/modules/auth/DTO/login-with-google.dto';
import { LoginWithDiscordDto } from 'src/modules/auth/DTO/login-with-discord.dto';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';

@Controller(Routes.Auth)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Auth(JwtAuthGuard)
  @Get('/user')
  public async user(
    @AuthenticatedUser() authenticatedUser: UserPublicEntity,
  ): Promise<UserPublicEntity | undefined> {
    return authenticatedUser;
  }

  @Post('/register')
  public async register(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ): Promise<Response<RegisterResponse>> {
    const user = await this.authService.register(createUserDto);

    return response
      .status(HttpStatus.CREATED)
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Volo-Access-Token',
        user.accessToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Volo-Refresh-Token',
        user.refreshToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json(user);
  }

  @Post('/login/credentials')
  public async loginWithCredentials(
    @Body() loginWithCredentialsDto: LoginWithCredentialsDto,
    @Res() response: Response,
  ): Promise<Response<LoginResponse>> {
    const user = await this.authService.loginWithCredentials(loginWithCredentialsDto);

    return response
      .status(HttpStatus.CREATED)
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Volo-Access-Token',
        user.accessToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Volo-Refresh-Token',
        user.refreshToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json(user);
  }

  @Post('/login/google')
  public async loginWithGoogle(
    @Body() loginWithGoogleDto: LoginWithGoogleDto,
    @Res() response: Response,
  ): Promise<Response<LoginResponse>> {
    const user = await this.authService.loginWithGoogle(loginWithGoogleDto);

    return response
      .status(HttpStatus.CREATED)
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Volo-Access-Token',
        user.accessToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Volo-Refresh-Token',
        user.refreshToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json(user);
  }

  @Post('/login/discord')
  public async loginWithDiscord(
    @Body() loginWithDiscordDto: LoginWithDiscordDto,
    @Res() response: Response,
  ): Promise<Response<LoginResponse>> {
    const user = await this.authService.loginWithDiscord(loginWithDiscordDto);

    return response
      .status(HttpStatus.CREATED)
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Volo-Access-Token',
        user.accessToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Volo-Refresh-Token',
        user.refreshToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json(user);
  }

  @Auth(JwtRefreshAuthGuard)
  @Post('/refresh')
  public async refresh(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<RefreshResponse>> {
    const { accessToken, refreshToken } = await this.authService.refresh({
      refreshToken:
        request.cookies[
          this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
            'Volo-Refresh-Token'
        ],
    });

    return response
      .status(HttpStatus.CREATED)
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Volo-Access-Token',
        accessToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Volo-Refresh-Token',
        refreshToken,
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json({ accessToken, refreshToken });
  }

  @Auth(JwtAuthGuard)
  @Post('/logout')
  public async logout(
    @Res() response: Response,
    @AuthenticatedUser() authenticatedUser: UserPublicEntity,
  ): Promise<Response<UserPublicEntity>> {
    const user = await this.authService.logout({ userId: authenticatedUser.id });

    return response
      .status(HttpStatus.CREATED)
      .clearCookie(
        this.configService.get<string>(ConfigVariables.CookieAccessTokenName) ||
          'Volo-Access-Token',
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .clearCookie(
        this.configService.get<string>(ConfigVariables.CookieRefreshTokenName) ||
          'Volo-Refresh-Token',
        {
          httpOnly: true,
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .json(user);
  }
}
