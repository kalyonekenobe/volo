import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { CreateCategoryToPostDto } from 'src/modules/category-to-post/DTO/create-category-to-post.dto';
import { PostCategoryEntity } from 'src/modules/post-category/entities/post-category.entity';
import { PostEntity } from 'src/modules/post/entities/post.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CategoryToPostService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAllPostCategories(
    postId: PostEntity['id'],
    options?: Prisma.CategoryToPostFindManyArgs,
  ): Promise<PostCategoryEntity[]> {
    return this.prismaService
      .$transaction(async tx => {
        await tx.post.findUniqueOrThrow({ where: { id: postId } });

        return tx.categoryToPost.findMany(
          _.merge(options, { where: { postId }, select: { postCategory: true } }),
        );
      })
      .then(result => result.map(item => item.postCategory));
  }

  public async createPostCategories(
    postId: PostEntity['id'],
    categories: PostCategoryEntity[],
  ): Promise<PostCategoryEntity[]> {
    return this.prismaService.$transaction(async tx => {
      await tx.post.findUniqueOrThrow({ where: { id: postId } });
      await tx.categoryToPost.createMany({
        data: categories.map(category => ({ postId, categoryId: category.id })),
        skipDuplicates: false,
      });

      return categories;
    });
  }

  public async updatePostCategories(
    postId: PostEntity['id'],
    categories: PostCategoryEntity[],
  ): Promise<PostCategoryEntity[]> {
    return this.prismaService.$transaction(async tx => {
      await tx.post.findUniqueOrThrow({ where: { id: postId } });
      await tx.categoryToPost.deleteMany({ where: { postId } });
      await tx.categoryToPost.createMany({
        data: categories.map(
          category => ({ postId, categoryId: category.id }) as CreateCategoryToPostDto,
        ),
        skipDuplicates: false,
      });

      return categories;
    });
  }

  public async removePostCategories(
    postId: PostEntity['id'],
    categories: PostCategoryEntity[],
  ): Promise<PostCategoryEntity[]> {
    return this.prismaService.$transaction(async tx => {
      await tx.post.findUniqueOrThrow({ where: { id: postId } });

      tx.categoryToPost.deleteMany({
        where: { AND: { postId, categoryId: { in: categories.map(category => category.id) } } },
      });

      return categories;
    });
  }
}
