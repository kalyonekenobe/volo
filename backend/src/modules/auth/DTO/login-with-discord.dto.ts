import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithDiscordDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  discordAccessToken: string;
}
