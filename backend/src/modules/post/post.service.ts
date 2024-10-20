import { Injectable } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import * as _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { Routes } from 'src/core/enums/app.enums';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostEntity } from './entity/post.entity';
import * as path from 'path';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async create(data: CreatePostDto, avatar?: Express.Multer.File): Promise<PostEntity> {
    return this.prismaService.post.create({ data }).then(post => {
      (post as PostEntity).currentlyRaisedFunds = new Decimal(0);
      if (avatar) {
        const filename = `${Routes.Posts}/${uuid()}${path.extname(avatar.originalname)}`;

        this.supabaseService.upload(avatar, filename).then(async response => {
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

  public async findAll(options?: Prisma.PostFindManyArgs) {
    const postsPromise =
      Object.entries(options ?? {}).length > 0
        ? this.prismaService.post.findMany(options)
        : this.prismaService.post.findMany();
    return postsPromise.then(async posts => {
      return await Promise.all(
        posts.map(async post => {
          const postWithCurrentFunds = await this.calculateRaisedFundsForPost(post);
          return postWithCurrentFunds;
        }),
      );
    });
  }

  public async findById(
    id: PostEntity['id'],
    options?: Omit<Prisma.PostFindUniqueOrThrowArgs, 'where'>,
  ): Promise<PostEntity> {
    return this.prismaService.post
      .findUniqueOrThrow(_.merge(options, { where: { id } }))
      .then(post => this.calculateRaisedFundsForPost(post));
  }

  public async updateById(
    id: PostEntity['id'],
    data: UpdatePostDto,
    avatar?: Express.Multer.File,
  ): Promise<PostEntity> {
    const { image: imageInDto, ...dataWithoutImage } = data;

    return this.prismaService.post
      .update({
        data,
        where: {
          id,
        },
      })
      .then(async post => {
        if (imageInDto === 'null') {
          await this.prismaService.user.update({
            where: { id: post.id },
            data: { image: null },
          });

          if (post.image) {
            this.supabaseService.remove([post.image]);
          }

          return post;
        }

        if (avatar) {
          const filename = `${Routes.Posts}/${uuid()}${path.extname(avatar.originalname)}`;

          this.supabaseService.upload(avatar, filename).then(async response => {
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

  public async deleteById(id: PostEntity['id']): Promise<PostEntity> {
    return this.prismaService.post
      .delete({
        where: {
          id,
        },
      })
      .then(post => {
        if (post.image) {
          this.supabaseService.remove([post.image]);
        }

        return post;
      });
  }

  private async calculateRaisedFundsForPost(post: PostEntity): Promise<PostEntity> {
    return this.prismaService.postDonation
      .aggregate({
        _sum: {
          donation: true,
        },
        where: {
          postId: post.id,
        },
      })
      .then(funds => {
        post.currentlyRaisedFunds = funds._sum.donation ?? new Decimal(0);
        return post;
      });
  }
}
