import { Injectable } from '@nestjs/common';
import { PostCategoryEntity } from './entities/post-category.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { UpdatePostCategoryDto } from 'src/modules/post-category/DTO/update-post-category.dto';
import { CreatePostCategoryDto } from 'src/modules/post-category/DTO/create-post-category.dto';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';

@Injectable()
export class PostCategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(options?: Prisma.PostCategoryFindManyArgs): Promise<PostCategoryEntity[]> {
    if (options) {
      return this.prismaService.postCategory.findMany(options);
    }

    return this.prismaService.postCategory.findMany();
  }

  public async findOne(
    options: Prisma.PostCategoryFindFirstOrThrowArgs,
  ): Promise<PostCategoryEntity> {
    return this.prismaService.postCategory.findFirstOrThrow(options);
  }

  public async create(data: CreatePostCategoryDto): Promise<PostCategoryEntity> {
    return this.prismaService.postCategory.create({ data });
  }

  public async update(
    id: PostCategoryEntity['id'],
    data: UpdatePostCategoryDto,
  ): Promise<PostCategoryEntity> {
    return this.prismaService.postCategory.update({ where: { id }, data });
  }

  public async remove(id: PostCategoryEntity['id']): Promise<PostCategoryEntity> {
    return this.prismaService.postCategory.delete({ where: { id } });
  }
}
