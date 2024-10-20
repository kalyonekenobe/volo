import { IsNotEmpty, IsString, MaxLength, IsDefined } from 'class-validator';
import { UserRegistrationMethodEntity } from 'src/modules/user-registration-method/entities/user-registration-method.entity';

export class CreateUserRegistrationMethodDto implements Pick<UserRegistrationMethodEntity, 'name'> {
  @IsString()
  @MaxLength(50)
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
