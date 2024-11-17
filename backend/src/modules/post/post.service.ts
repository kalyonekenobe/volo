import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { Routes } from 'src/core/enums/app.enums';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePostDto } from './DTO/create-post.dto';
import { UpdatePostDto } from './DTO/update-post.dto';
import { PostEntity } from './entities/post.entity';
import * as path from 'path';
import { Prisma } from '@prisma/client';
import { CreatePostRequestFiles, UpdatePostRequestFiles } from 'src/modules/post/types/post.types';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async findAll(options?: Prisma.PostFindManyArgs): Promise<PostEntity[]> {
    if (options) {
      return this.prismaService.post
        .findMany(options)
        .then(posts => Promise.all(posts.map(post => this.calculateRaisedFundsForPost(post))));
    }

    return this.prismaService.post
      .findMany()
      .then(posts => Promise.all(posts.map(post => this.calculateRaisedFundsForPost(post))));
  }

  public async findOne(options: Prisma.PostFindUniqueOrThrowArgs): Promise<PostEntity> {
    return this.prismaService.post
      .findUniqueOrThrow(options)
      .then(post => this.calculateRaisedFundsForPost(post));
  }

  public async create(data: CreatePostDto, files?: CreatePostRequestFiles): Promise<PostEntity> {
    const { categories, ...dataWithoutCategories } = data;

    return this.prismaService.post
      .create({
        data: {
          ...dataWithoutCategories,
          categoriesToPosts: {
            createMany: {
              data: categories || [],
              skipDuplicates: false,
            },
          },
        },
      })
      .then(post => {
        if (files?.image?.length) {
          const image = files?.image[0];
          const filename = `${Routes.Posts}/${uuid()}${path.extname(image.originalname)}`;

          this.supabaseService.upload(image, filename).then(async response => {
            if (response.file.filename) {
              await this.prismaService.post.update({
                where: { id: post.id },
                data: { image: response.file.filename },
              });
            }
          });
        }

        return post;
      });
  }

  public async update(
    id: PostEntity['id'],
    data: UpdatePostDto,
    files?: UpdatePostRequestFiles,
  ): Promise<PostEntity> {
    const { image: imageInDto, categories, ...dataWithoutImageAndCategories } = data;

    return this.prismaService.post
      .update({
        data: {
          ...dataWithoutImageAndCategories,
          categoriesToPosts: {
            deleteMany: {},
            createMany: {
              data: categories ?? [],
              skipDuplicates: true,
            },
          },
        },
        where: { id },
      })
      .then(async post => {
        const image = files?.image?.[0];

        if (imageInDto === 'null') {
          await this.prismaService.post.update({
            where: { id: post.id },
            data: { image: null },
          });

          if (post.image) {
            this.supabaseService.remove([post.image]);
          }

          return post;
        }

        if (image) {
          const filename = `${Routes.Posts}/${uuid()}${path.extname(image.originalname)}`;

          this.supabaseService.upload(image, filename).then(async response => {
            if (response.file.filename) {
              await this.prismaService.post.update({
                where: { id: post.id },
                data: { image: response.file.filename },
              });

              if (post.image) {
                this.supabaseService.remove([post.image]);
              }
            }
          });
        }

        return post;
      })
      .then(post => this.calculateRaisedFundsForPost(post));
  }

  public async remove(id: PostEntity['id']): Promise<PostEntity> {
    return this.prismaService.post.delete({ where: { id } }).then(post => {
      if (post.image) {
        this.supabaseService.remove([post.image]);
      }

      return post;
    });
  }

  private async calculateRaisedFundsForPost(post: PostEntity): Promise<PostEntity> {
    return this.prismaService.postDonation
      .aggregate({ _sum: { donation: true }, where: { postId: post.id } })
      .then(funds => ({ ...post, currentlyRaisedFunds: funds._sum.donation || new Decimal(0) }));
  }
}
