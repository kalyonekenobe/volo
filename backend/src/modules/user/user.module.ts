import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRegistrationMethodModule } from 'src/modules/user-registration-method/user-registration-method.module';
import { UserRoleModule } from 'src/modules/user-role/user-role.module';

@Module({
  imports: [UserRegistrationMethodModule, UserRoleModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
