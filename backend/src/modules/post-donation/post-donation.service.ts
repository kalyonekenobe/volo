import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import * as _ from 'lodash';
import { CreatePostDonationDto } from 'src/modules/post-donation/DTO/create-post-donation.dto';
import { UpdatePostDonationDto } from 'src/modules/post-donation/DTO/update-post-donation.dto';
import { PostDonationEntity } from 'src/modules/post-donation/entities/post-donation.entity';
import { PostEntity } from 'src/modules/post/entities/post.entity';
import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class PostDonationService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findOne(
    options: Prisma.PostDonationFindUniqueOrThrowArgs,
  ): Promise<PostDonationEntity> {
    return this.prismaService.postDonation.findUniqueOrThrow(options);
  }

  public async findAllForPost(
    postId: PostEntity['id'],
    options?: Prisma.PostDonationFindManyArgs,
  ): Promise<PostDonationEntity[]> {
    return this.prismaService.$transaction(async tx => {
      await tx.post.findUniqueOrThrow({ where: { id: postId } });

      return tx.postDonation.findMany(_.merge(options, { where: { postId } }));
    });
  }

  public async create(
    postId: PostEntity['id'],
    data: CreatePostDonationDto,
  ): Promise<PostDonationEntity> {
    return this.prismaService.postDonation.create({
      data: { ...data, postId, metadata: data.metadata || Prisma.JsonNull },
    });
  }

  public async update(
    id: PostDonationEntity['id'],
    data: UpdatePostDonationDto,
  ): Promise<PostDonationEntity> {
    return this.prismaService.postDonation.update({
      where: { id },
      data: { ...data, metadata: data.metadata || Prisma.JsonNull },
    });
  }

  public async remove(id: PostDonationEntity['id']): Promise<PostDonationEntity> {
    return this.prismaService.postDonation.delete({ where: { id } });
  }
}
