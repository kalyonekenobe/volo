import { IsNotEmpty, IsString, MaxLength, IsDefined } from 'class-validator';
import { UserRegistrationMethod } from '@prisma/client';

export class CreateUserRegistrationMethodDto
  implements Omit<UserRegistrationMethod, 'createdAt' | 'updatedAt' | 'id'>
{
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
