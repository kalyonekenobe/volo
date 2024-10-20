import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UserRegistrationMethodEntity } from '../user-registration-method/entities/user-registration-method.entity';
import { CreateUserRoleDto } from './DTO/create-user-role.dto';
import { UpdateUserRoleDto } from './DTO/update-user-role.dto';
import { UserRoleEntity } from './entities/user-role.entity';
import { UserRoleService } from './user-role.service';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import * as _ from 'lodash';
import { Auth } from 'src/core/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('user-roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  public async findAll(@Query() query?: string): Promise<UserRoleEntity[]> {
    return this.userRoleService.findAll(deserializeQueryString(query));
  }

  @Get(':id')
  public async findOneById(
    @Param('id', ParseIntPipe) id: UserRoleEntity['id'],
    @Query() query?: string,
  ): Promise<UserRoleEntity> {
    return this.userRoleService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @Post()
  public async create(@Body() createUserRoleDto: CreateUserRoleDto): Promise<UserRoleEntity> {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Auth(JwtAuthGuard)
  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id'],
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ): Promise<UserRoleEntity> {
    return this.userRoleService.update(id, updateUserRoleDto);
  }

  @Auth(JwtAuthGuard)
  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id'],
  ): Promise<UserRoleEntity> {
    return this.userRoleService.remove(id);
  }
}
