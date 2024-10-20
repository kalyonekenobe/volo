import { UserRole } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsDefined,
  IsInt,
  IsDate,
  MaxDate,
} from 'class-validator';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';

export class UserRoleEntity implements UserRole {
  @IsInt()
  @IsDefined()
  id: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  permissions: bigint;

  @IsDate()
  @MaxDate(new Date())
  @IsDefined()
  createdAt: Date;

  @IsDate()
  @MaxDate(new Date())
  @IsDefined()
  updatedAt: Date;

  users?: UserPublicEntity[];
}
