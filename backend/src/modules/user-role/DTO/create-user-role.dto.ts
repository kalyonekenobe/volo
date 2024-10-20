import { IsDefined, IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserRoleEntity } from 'src/modules/user-role/entities/user-role.entity';

export class CreateUserRoleDto implements Pick<UserRoleEntity, 'name' | 'permissions'> {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @IsDefined()
  name: string;

  @IsInt()
  @IsDefined()
  permissions: bigint;
}
