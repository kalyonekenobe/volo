import { Module } from '@nestjs/common';
import { UserRegistrationMethodService } from './user-registration-method.service';
import { UserRegistrationMethodController } from './user-registration-method.controller';

@Module({
  controllers: [UserRegistrationMethodController],
  providers: [UserRegistrationMethodService],
})
export class UserRegistrationMethodModule {}
