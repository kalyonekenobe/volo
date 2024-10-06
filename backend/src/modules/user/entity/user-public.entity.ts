import { User } from '@prisma/client';
import { IsDate, IsDefined, IsEmail, IsNotEmpty, IsInt, IsPhoneNumber, IsString, IsUUID, MaxDate, MaxLength, MinDate, ValidateIf } from 'class-validator';
import { PostEntity } from 'src/modules/post/entity/post.entity';
import { UserRegistrationMethodEntity } from 'src/modules/user-registration-method/entity/user-registration-method.entity';
import { UserRoleEntity } from 'src/modules/user-role/entity/user-role.entity';

export class UserPublicEntity implements Omit<User, 'password' | 'refreshToken'> {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  email: string;

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
  birthDate: Date | null;

  @IsPhoneNumber()
  @MaxLength(15)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  phone: string | null;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  bio: string | null;

  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  image: string | null;

  @IsInt()
  @IsDefined()
  userRegistrationMethodId: number;

  @IsInt()
  @IsDefined()
  userRoleId: number;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  stripeCustomerId: string | null;

  @IsDate()
  @MaxDate(new Date())
  @ValidateIf((_, value) => value)
  createdAt: Date;

  @IsDate()
  @MaxDate(new Date())
  @ValidateIf((_, value) => value)
  updatedAt: Date;

  userRegistrationMethod?: UserRegistrationMethodEntity[];
  userRole?: UserRoleEntity[];
  posts?: PostEntity[];
}