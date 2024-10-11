import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as qs from 'qs';
import { UploadResourceTypes } from 'src/core/constants/constants';
import { UploadRestrictions } from 'src/core/decorators/upload-restrictions.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { parseObjectStringValuesToPrimitives } from 'src/core/utils/url.utils';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entity/post.entity';
import { PostService } from './post.service';

@Controller(Routes.Posts)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(
    @Body() dto: CreatePostDto,
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
    return this.postService.create(dto, avatar);
  }

  @Get()
  public async findAll(@Query() query?: string) {
    return this.postService.findAll(
      query
        ? parseObjectStringValuesToPrimitives(qs.parse(query, { comma: true, allowDots: true }))
        : undefined,
    );
  }

  @Get(':id')
  public async findById(@Param('id') id: PostEntity['id'], @Query() query?: string) {
    return this.postService.findById(
      id,
      query
        ? parseObjectStringValuesToPrimitives(qs.parse(query, { comma: true, allowDots: true }))
        : undefined,
    );
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  public async updateById(
    @Body() dto: UpdatePostDto,
    @Param('id') id: PostEntity['id'],
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
    return this.postService.updateById(id, dto, avatar);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteById(@Param('id') id: PostEntity['id']) {
    return this.postService.deleteById(id);
  }
}
