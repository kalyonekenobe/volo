import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadResourceTypes } from 'src/core/constants/constants';
import { UploadRestrictions } from 'src/core/decorators/upload-restrictions.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPublicEntity } from './entity/user-public.entity';
import { UserService } from './user.service';

@Controller(Routes.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(
    @Body() dto: CreateUserDto,
    @UploadedFile()
    @UploadRestrictions([
      {
        fieldname: 'avatar',
        minFileSize: 1,
        maxFileSize: 1024 * 1024 * 5,
        allowedMimeTypes: UploadResourceTypes.IMAGE,
      },
    ])
    avatar?: Express.Multer.File,
  ) {
    return this.userService.create(dto, avatar);
  }

  @Get()
  public async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  public async findOneById(@Param('id') id: UserPublicEntity['id']) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  public async updateOneById(
    @Body() dto: UpdateUserDto,
    @Param('id') id: UserPublicEntity['id'],
    @UploadedFile()
    @UploadRestrictions([
      {
        fieldname: 'avatar',
        minFileSize: 1,
        maxFileSize: 1024 * 1024 * 5,
        allowedMimeTypes: UploadResourceTypes.IMAGE,
      },
    ])
    avatar?: Express.Multer.File,
  ) {
    return this.userService.update(id, dto, avatar);
  }

  @Delete(':id')
  @HttpCode(204)
  public async deleteOneById(@Param('id') id: UserPublicEntity['id']) {
    return this.userService.deleteById(id);
  }
}
