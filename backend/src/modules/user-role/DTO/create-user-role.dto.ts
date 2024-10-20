import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength, ValidateIf } from 'class-validator';
import { UserRoleEntity } from 'src/modules/user-role/entities/user-role.entity';

export class CreateUserRoleDto
  implements Pick<UserRoleEntity, 'name'>, Pick<Partial<UserRoleEntity>, 'permissions'>
{
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  name: string;

  @IsInt()
  @Type(() => BigInt)
  @ValidateIf((_, value) => value)
  permissions?: bigint;
}
