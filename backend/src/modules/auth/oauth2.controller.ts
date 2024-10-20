import { Body, Controller, Get, HttpStatus, Post, Query, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { ConfigVariables, Routes } from 'src/core/enums/app.enums';
import { AuthService } from 'src/modules/auth/auth.service';

@Controller(Routes.OAuth2)
export class OAuth2Controller {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/google')
  public async generateGoogleOAuth2Url(@Body() data, @Res() response: Response): Promise<Response> {
    const url = await this.authService.generateGoogleOAuth2Url(data);

    return response.status(HttpStatus.CREATED).json({ url });
  }

  @Get('/callback/google')
  public async generateGoogleOAuth2Token(
    @Query('state') state: string,
    @Query('code') code: string,
    @Res() response: Response,
  ): Promise<void> {
    const { token } = await this.authService.generateGoogleOAuth2Token(code, state);

    return response
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieOAuth2TokenName) ||
          'Volo-OAuth2-Token',
        token,
        {
          path: '/',
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .redirect(JSON.parse(state).referer);
  }

  @Post('/discord')
  public async generateDiscordOAuth2Url(
    @Body() data,
    @Res() response: Response,
  ): Promise<Response> {
    const url = await this.authService.generateDiscordOAuth2Url(data);

    return response.status(HttpStatus.CREATED).json({ url });
  }

  @Get('/callback/discord')
  public async generateDiscordOAuth2Token(
    @Query('state') state: string,
    @Query('code') code: string,
    @Res() response: Response,
  ): Promise<void> {
    const { token } = await this.authService.generateDiscordOAuth2Token(code, state);

    return response
      .cookie(
        this.configService.get<string>(ConfigVariables.CookieOAuth2TokenName) ||
          'Volo-OAuth2-Token',
        token,
        {
          path: '/',
          domain: this.configService.get<string>(ConfigVariables.CookieDomain),
        },
      )
      .redirect(JSON.parse(state).referer);
  }
}
