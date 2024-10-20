import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsString,
  ValidateIf,
  IsDate,
  MinDate,
  IsInt,
  IsPhoneNumber,
} from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class UpdateUserDto
  implements
    Pick<
      Partial<UserEntity>,
      | 'email'
      | 'password'
      | 'firstName'
      | 'lastName'
      | 'birthDate'
      | 'userRegistrationMethodId'
      | 'userRoleId'
      | 'phone'
      | 'bio'
      | 'image'
      | 'refreshToken'
      | 'stripeCustomerId'
    >
{
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @ValidateIf((_, value) => value)
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @ValidateIf((_, value) => value)
  password?: string | null;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  firstName?: string | null;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  lastName?: string | null;

  @IsDate()
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 6)))
  @ValidateIf((_, value) => value)
  @Type(() => Date)
  birthDate?: Date | null;

  @IsInt()
  @ValidateIf((_, value) => value)
  userRegistrationMethodId?: number;

  @IsInt()
  @ValidateIf((_, value) => value)
  userRoleId?: number;

  @IsPhoneNumber()
  @MaxLength(15)
  @ValidateIf((_, value) => value)
  phone?: string | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  bio?: string | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  image?: string | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  refreshToken?: string | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  stripeCustomerId?: string | null;
}
