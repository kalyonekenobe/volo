import { IsNotEmpty, IsString, MaxLength, MinLength, ValidateIf } from 'class-validator';
import { UserRegistrationMethodEntity } from 'src/modules/user-registration-method/entities/user-registration-method.entity';

export class UpdateUserRegistrationMethodDto
  implements Pick<Partial<UserRegistrationMethodEntity>, 'name'>
{
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  @MinLength(2)
  @ValidateIf((_, value) => value)
  name: string;
}
