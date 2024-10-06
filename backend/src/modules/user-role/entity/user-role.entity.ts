import { UserRole } from "@prisma/client";
import { IsString, IsNotEmpty, MaxLength, IsDefined, IsInt, IsDate, MaxDate } from "class-validator";

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
}