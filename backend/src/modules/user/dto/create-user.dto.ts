import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsDefined,
  IsEmail,
  MaxLength,
  IsString,
  ValidateIf,
  IsDate,
  MinDate,
  IsInt,
} from 'class-validator';

export class CreateUserDto
  implements
    Omit<
      User,
      | 'id'
      | 'phone'
      | 'bio'
      | 'image'
      | 'refreshToken'
      | 'stripeCustomerId'
      | 'createdAt'
      | 'updatedAt'
    >
{
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  password: string;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  firstName: string | null;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  lastName: string | null;

  @IsDate()
  @MinDate(new Date(new Date().setFullYear(new Date().getFullYear() - 6)))
  @ValidateIf((_, value) => value)
  @Type(() => Date)
  birthDate: Date | null;

  @IsInt()
  @IsDefined()
  @Type(() => Number)
  userRegistrationMethodId: number;

  @IsInt()
  @IsDefined()
  @Type(() => Number)
  userRoleId: number;
}