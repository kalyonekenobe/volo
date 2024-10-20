import { IsDefined, IsEmail, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class LoginWithCredentialsDto implements Pick<UserEntity, 'email' | 'password'> {
  @MaxLength(50)
  @IsEmail()
  @IsNotEmpty()
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  @ValidateIf((_, value) => value)
  password: string | null;
}
