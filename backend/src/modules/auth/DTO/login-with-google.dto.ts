import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithGoogleDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  googleAccessToken: string;
}
