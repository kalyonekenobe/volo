import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import ValidationPipes from 'src/core/config/validation.pipes';
import { Auth } from 'src/core/decorators/auth.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { CategoryToPostService } from 'src/modules/category-to-post/category-to-post.service';
import { PostCategoryEntity } from 'src/modules/post-category/entities/post-category.entity';
import { PostEntity } from 'src/modules/post/entities/post.entity';

@Controller(Routes.CategoriesToPosts)
export class CategoryToPostController {
  constructor(private readonly categoryToPostService: CategoryToPostService) {}

  @Auth(JwtAuthGuard)
  @Post()
  public async createPostCategories(
    @Param('id') postId: PostEntity['id'],
    @Body(ValidationPipes.parseArrayPipe(PostCategoryEntity))
    postCategoriesList: PostCategoryEntity[],
  ): Promise<PostCategoryEntity[]> {
    return this.categoryToPostService.createPostCategories(postId, postCategoriesList);
  }

  @Get()
  public async findAllPostCategories(
    @Param('id') postId: PostEntity['id'],
    @Query() query?: string,
  ): Promise<PostCategoryEntity[]> {
    return this.categoryToPostService.findAllPostCategories(postId, deserializeQueryString(query));
  }

  @Auth(JwtAuthGuard)
  @Put()
  public async updatePostCategories(
    @Param('id') postId: PostEntity['id'],
    @Body(ValidationPipes.parseArrayPipe(PostCategoryEntity))
    postCategoriesList: PostCategoryEntity[],
  ): Promise<PostCategoryEntity[]> {
    return this.categoryToPostService.updatePostCategories(postId, postCategoriesList);
  }

  @Auth(JwtAuthGuard)
  @Delete()
  public async removePostCategories(
    @Param('id') postId: PostEntity['id'],
    @Body(ValidationPipes.parseArrayPipe(PostCategoryEntity))
    postCategoriesList: PostCategoryEntity[],
  ): Promise<PostCategoryEntity[]> {
    return this.categoryToPostService.removePostCategories(postId, postCategoriesList);
  }
}
