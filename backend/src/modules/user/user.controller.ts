import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadResourceTypes } from 'src/core/constants/constants';
import { UploadRestrictions } from 'src/core/decorators/upload-restrictions.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { UserPublicEntity } from './entities/user-public.entity';
import { UserService } from './user.service';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import * as _ from 'lodash';

@Controller(Routes.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public async findAll(@Query() query?: string) {
    return this.userService.findAll(deserializeQueryString(query));
  }

  @Get(':id')
  public async findOneById(@Param('id') id: UserPublicEntity['id'], @Query() query?: string) {
    return this.userService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(
    @Body() createUserDto: CreateUserDto,
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
  ): Promise<UserPublicEntity> {
    return this.userService.create(createUserDto, avatar);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  public async update(
    @Param('id') id: UserPublicEntity['id'],
    @Body() updateUserDto: UpdateUserDto,
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
  ): Promise<UserPublicEntity> {
    return this.userService.update(id, updateUserDto, avatar);
  }

  @Delete(':id')
  public async remove(@Param('id') id: UserPublicEntity['id']): Promise<UserPublicEntity> {
    return this.userService.remove(id);
  }
}
