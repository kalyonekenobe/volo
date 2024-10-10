import { UserRole } from '@prisma/client';
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateUserRoleDto implements Omit<UserRole, 'id' | 'createdAt' | 'updatedAt'> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  permissions: bigint;
}