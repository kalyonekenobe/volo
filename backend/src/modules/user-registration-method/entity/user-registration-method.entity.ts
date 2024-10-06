import {
  IsInt,
  IsDefined,
  IsString,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsDate,
  MaxDate,
} from 'class-validator';
import { UserRegistrationMethod } from '@prisma/client';

export class UserRegistrationMethodEntity implements UserRegistrationMethod {
  @IsInt()
  @IsDefined()
  id: number;

  @IsString()
  @MaxLength(50)
  @MinLength(2)
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsDate()
  @MaxDate(new Date())
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @MaxDate(new Date())
  @IsDefined()
  updatedAt: Date;
}
