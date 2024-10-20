import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { CreateUserRegistrationMethodDto } from './DTO/create-user-registration-method.dto';
import { UpdateUserRegistrationMethodDto } from './DTO/update-user-registration-method.dto';
import { UserRegistrationMethodEntity } from './entities/user-registration-method.entity';
import { UserRegistrationMethodService } from './user-registration-method.service';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import * as _ from 'lodash';

@Controller('user-registration-methods')
export class UserRegistrationMethodController {
  constructor(private readonly userRegistrationMethodService: UserRegistrationMethodService) {}

  @Get()
  public async findAll(@Query() query?: string): Promise<UserRegistrationMethodEntity[]> {
    return this.userRegistrationMethodService.findAll(deserializeQueryString(query));
  }

  @Get(':id')
  public async findOneById(
    @Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id'],
    @Query() query?: string,
  ): Promise<UserRegistrationMethodEntity> {
    return this.userRegistrationMethodService.findOne(
      _.merge(deserializeQueryString(query), { where: { id } }),
    );
  }

  @Post()
  public async create(
    @Body() createUserRegistrationMethodDto: CreateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.userRegistrationMethodService.create(createUserRegistrationMethodDto);
  }

  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id'],
    @Body() updateUserRegistrationMethodDto: UpdateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.userRegistrationMethodService.update(id, updateUserRegistrationMethodDto);
  }

  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id'],
  ): Promise<UserRegistrationMethodEntity> {
    return this.userRegistrationMethodService.remove(id);
  }
}
