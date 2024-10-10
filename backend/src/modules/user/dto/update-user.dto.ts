import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  MaxLength,
  IsDefined,
  IsString,
  ValidateIf,
  IsDate,
  MinDate,
  IsInt,
  IsPhoneNumber,
} from 'class-validator';

export class UpdateUserDto implements Omit<User, 'id' | 'createdAt' | 'updatedAt'> {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
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

  @IsPhoneNumber()
  @MaxLength(15)
  @ValidateIf((_, value) => value)
  phone: string | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  bio: string | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  image: string | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  refreshToken: string | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  stripeCustomerId: string | null;
}
