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
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { CreatePostDto } from './DTO/create-post.dto';
import { UpdatePostDto } from './DTO/update-post.dto';
import { PostEntity } from './entities/post.entity';
import { PostService } from './post.service';
import * as _ from 'lodash';

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
  @UseInterceptors(FileInterceptor('avatar'))
  public async create(
    @Body() createPostDto: CreatePostDto,
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
  ): Promise<PostEntity> {
    return this.postService.create(createPostDto, avatar);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  public async update(
    @Param('id') id: PostEntity['id'],
    @Body() updatePostDto: UpdatePostDto,
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
  ): Promise<PostEntity> {
    return this.postService.update(id, updatePostDto, avatar);
  }

  @Delete(':id')
  public async remove(@Param('id') id: PostEntity['id']) {
    return this.postService.remove(id);
  }
}
