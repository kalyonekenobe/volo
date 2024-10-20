import {
  Body,
  Controller,
  Delete,
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
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { CreatePostDto } from './DTO/create-post.dto';
import { UpdatePostDto } from './DTO/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';
import * as _ from 'lodash';
import { CreatePostRequestFiles, UpdatePostRequestFiles } from 'src/modules/post/types/post.types';

@Controller(Routes.Posts)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async findAll(@Query() query?: string): Promise<PostEntity[]> {
    return this.postService.findAll(deserializeQueryString(query));
  }

  @Get(':id')
  public async findById(@Param('id') id: PostEntity['id'], @Query() query?: string) {
    return this.postService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  public async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFiles()
    @UploadRestrictions([
      {
        fieldname: 'image',
        minFileSize: 1,
        maxFileSize: 1024 * 1024 * 5,
        allowedMimeTypes: UploadResourceTypes.IMAGE,
      },
    ])
    files?: CreatePostRequestFiles,
  ): Promise<PostEntity> {
    return this.postService.create(createPostDto, files);
  }

  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  public async update(
    @Param('id') id: PostEntity['id'],
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFiles()
    @UploadRestrictions([
      {
        fieldname: 'image',
        minFileSize: 1,
        maxFileSize: 1024 * 1024 * 5,
        allowedMimeTypes: UploadResourceTypes.IMAGE,
      },
    ])
    files?: UpdatePostRequestFiles,
  ): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto, files);
  }

  @Delete(':id')
  public async remove(@Param('id') id: PostEntity['id']) {
    return this.postService.remove(id);
  }
}
