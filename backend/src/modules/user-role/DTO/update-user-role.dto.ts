import { Type } from 'class-transformer';
import { IsString, MaxLength, ValidateIf, IsInt, IsNotEmpty } from 'class-validator';
import { UserRoleEntity } from 'src/modules/user-role/entities/user-role.entity';

export class UpdateUserRoleDto implements Pick<Partial<UserRoleEntity>, 'name' | 'permissions'> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @ValidateIf((_, value) => value)
  name?: string;

  @IsInt()
  @Type(() => BigInt)
  @ValidateIf((_, value) => value)
  permissions?: bigint;
}
