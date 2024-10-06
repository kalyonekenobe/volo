import { IsNotEmpty, IsString, MaxLength, MinLength, IsDefined } from 'class-validator';
import { UserRegistrationMethod } from '@prisma/client';

export class UpdateUserRegistrationMethodDto
  implements Omit<UserRegistrationMethod, 'createdAt' | 'updatedAt' | 'id'>
{
  @IsString()
  @MaxLength(50)
  @MinLength(2)
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
