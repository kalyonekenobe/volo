import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadResourceTypes } from 'src/core/constants/constants';
import { UploadRestrictions } from 'src/core/decorators/upload-restrictions.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { CreateUserDto } from './DTO/create-user.dto';
import { UpdateUserDto } from './DTO/update-user.dto';
import { UserPublicEntity } from './entities/user-public.entity';
import { UserService } from './user.service';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import * as _ from 'lodash';
import {
  CreateUserUploadedFiles,
  UpdateUserUploadedFiles,
} from 'src/modules/user/types/user.types';
import { Auth } from 'src/core/decorators/auth.decorator';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';

@Controller(Routes.Users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Auth(JwtAuthGuard)
  @Get()
  public async findAll(@Query() query?: string) {
    return this.userService.findAll(deserializeQueryString(query));
  }

  @Auth(JwtAuthGuard)
  @Get(':id')
  public async findOneById(@Param('id') id: UserPublicEntity['id'], @Query() query?: string) {
    return this.userService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  public async create(
    @Body() createUserDto: CreateUserDto,
    @UploadedFiles()
    @UploadRestrictions([
      {
        fieldname: 'image',
        minFileSize: 1,
        maxFileSize: 1024 * 1024 * 5,
        allowedMimeTypes: UploadResourceTypes.IMAGE,
      },
    ])
    files?: CreateUserUploadedFiles,
  ): Promise<UserPublicEntity> {
    return this.userService.create(createUserDto, files);
  }

  @Auth(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  public async update(
    @Param('id') id: UserPublicEntity['id'],
    @Body() updateUserDto: UpdateUserDto,
    @AuthenticatedUser() authenticatedUser: UserPublicEntity,
    @UploadedFiles()
    @UploadRestrictions([
      {
        fieldname: 'image',
        minFileSize: 1,
        maxFileSize: 1024 * 1024 * 5,
        allowedMimeTypes: UploadResourceTypes.IMAGE,
      },
    ])
    files?: UpdateUserUploadedFiles,
  ): Promise<UserPublicEntity> {
    if (id !== authenticatedUser.id) {
      throw new ForbiddenException(
        'This action is forbiden for user. User id must be equal to the authenticated user id',
      );
    }

    return this.userService.update(id, updateUserDto, files);
  }

  @Auth(JwtAuthGuard)
  @Delete(':id')
  public async remove(
    @Param('id') id: UserPublicEntity['id'],
    @AuthenticatedUser() authenticatedUser: UserPublicEntity,
  ): Promise<UserPublicEntity> {
    if (id !== authenticatedUser.id) {
      throw new ForbiddenException(
        'This action is forbiden for user. User id must be equal to the authenticated user id',
      );
    }

    return this.userService.remove(id);
  }
}
