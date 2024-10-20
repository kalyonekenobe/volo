import { IsDefined, IsNotEmpty, IsUUID } from 'class-validator';
import { UserEntity } from 'src/modules/user/entities/user.entity';

export class LogoutDto {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  userId: UserEntity['id'];
}
