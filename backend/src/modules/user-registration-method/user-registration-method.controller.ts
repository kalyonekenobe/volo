import { Controller, Post, Body, Get, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateUserRegistrationMethodDto } from './dto/create-user-registration-method.dto';
import { UpdateUserRegistrationMethodDto } from './dto/update-user-registration-method.dto';
import { UserRegistrationMethodEntity } from './entity/user-registration-method.entity';
import { UserRegistrationMethodService } from './user-registration-method.service';

@Controller('user-registration-methods')
export class UserRegistrationMethodController {
  constructor(private readonly userRegistrationMethodService: UserRegistrationMethodService) {}

  @Post()
  public async create(@Body() dto: CreateUserRegistrationMethodDto) {
    return this.userRegistrationMethodService.create(dto);
  }

  @Get()
  public async findAll() {
    return this.userRegistrationMethodService.findAll();
  }

  @Get(':id')
  public async findOneById(@Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id']) {
    return this.userRegistrationMethodService.findOneById(id);
  }

  @Put(':id')
  public async updateOneById(
    @Body() dto: UpdateUserRegistrationMethodDto,
    @Param('id') id: UserRegistrationMethodEntity['id'],
  ) {
    return this.userRegistrationMethodService.updateOneById(dto, id);
  }

  @Delete(':id')
  public async deleteOneById(@Param('id', ParseIntPipe) id: UserRegistrationMethodEntity['id']) {
    return this.userRegistrationMethodService.deleteOneById(id);
  }
}
