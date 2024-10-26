import { IsDefined, IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class RefreshDto implements Pick<UserEntity, 'refreshToken'> {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  refreshToken: string;
}
