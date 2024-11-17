import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostCategoryService } from './post-category.service';
import { PostCategoryEntity } from './entities/post-category.entity';
import { Auth } from 'src/core/decorators/auth.decorator';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { Routes } from 'src/core/enums/app.enums';
import * as _ from 'lodash';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CreatePostCategoryDto } from 'src/modules/post-category/DTO/create-post-category.dto';
import { UpdatePostCategoryDto } from 'src/modules/post-category/DTO/update-post-category.dto';

@Controller(Routes.PostCategories)
export class PostCategoryController {
  constructor(private readonly postCategoryService: PostCategoryService) {}

  @Auth(JwtAuthGuard)
  @Post()
  public async create(
    @Body() createPostCategoryDto: CreatePostCategoryDto,
  ): Promise<PostCategoryEntity> {
    return this.postCategoryService.create(createPostCategoryDto);
  }

  @Get()
  public async findAll(@Query() query?: string): Promise<PostCategoryEntity[]> {
    return this.postCategoryService.findAll(deserializeQueryString(query));
  }

  @Get(':id')
  public async findOne(
    @Param('id', ParseIntPipe) id: PostCategoryEntity['id'],
    @Query() query?: string,
  ): Promise<PostCategoryEntity> {
    return this.postCategoryService.findOne(
      _.merge(deserializeQueryString(query), { where: { id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @Put(':id')
  public async update(
    @Param('id', ParseIntPipe) id: PostCategoryEntity['id'],
    @Body() updatePostCategoryDto: UpdatePostCategoryDto,
  ): Promise<PostCategoryEntity> {
    return this.postCategoryService.update(id, updatePostCategoryDto);
  }

  @Auth(JwtAuthGuard)
  @Delete(':id')
  public async remove(
    @Param('id', ParseIntPipe) id: PostCategoryEntity['id'],
  ): Promise<PostCategoryEntity> {
    return this.postCategoryService.remove(id);
  }
}
