import { UserRole } from "@prisma/client";
import { IsString, IsNotEmpty, MaxLength, IsDefined, IsInt } from "class-validator";

export class UpdateUserRoleDto implements Omit<UserRole, 'id' | 'createdAt' | 'updatedAt'> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  permissions: bigint;
}