import { Controller, Post, Body, Get, Param, Put, Delete, HttpStatus, HttpCode } from '@nestjs/common';
import { UserRegistrationMethodEntity } from '../user-registration-method/entity/user-registration-method.entity';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleEntity } from './entity/user-role.entity';
import { UserRoleService } from './user-role.service';


@Controller('user-roles')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  public async create(@Body() dto: CreateUserRoleDto) {
    return this.userRoleService.create(dto);
  }

  @Get()
  public async findAll() {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  public async findOneById(@Param('id') id: UserRoleEntity['id']) {
    return this.userRoleService.findOneById(id);
  }

  @Put(':id')
  public async updateOneById(
    @Body() dto: UpdateUserRoleDto,
    @Param('id') id: UserRegistrationMethodEntity['id'],
  ) {
    return this.userRoleService.updateOneById(dto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async deleteOneById(@Param('id') id: UserRegistrationMethodEntity['id']) {
    return this.userRoleService.deleteOneById(id);
  }
}
