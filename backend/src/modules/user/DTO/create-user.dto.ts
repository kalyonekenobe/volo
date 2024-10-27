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
  MaxDate,
  IsInt,
  Min,
} from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class CreateUserDto
  implements
    Pick<UserEntity, 'email' | 'userRegistrationMethodId' | 'userRoleId'>,
    Pick<Partial<UserEntity>, 'password' | 'firstName' | 'lastName' | 'birthDate'>
{
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
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

  @Type(() => Date)
  @IsDate()
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 6)))
  @MinDate(new Date(new Date(1930, 1, 1).setHours(0, 0, 0, 0)))
  @ValidateIf((_, value) => value)
  birthDate?: Date | null;

  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  userRegistrationMethodId: number;

  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsDefined()
  userRoleId: number;
}
