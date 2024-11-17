import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
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
import { AuthenticatedUser } from 'src/core/decorators/authenticated-user.decorator';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { Auth } from 'src/core/decorators/auth.decorator';
import { PostDonationService } from 'src/modules/post-donation/post-donation.service';
import { CreatePostDonationDto } from 'src/modules/post-donation/DTO/create-post-donation.dto';
import { PostDonationEntity } from 'src/modules/post-donation/entities/post-donation.entity';

@Controller(Routes.Posts)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly postDonationService: PostDonationService,
  ) {}

  @Auth(JwtAuthGuard)
  @Get()
  public async findAll(@Query() query?: string): Promise<PostEntity[]> {
    return this.postService.findAll(deserializeQueryString(query));
  }

  @Get(':id/donations')
  public async findAllPostDonations(@Param('id') id: string): Promise<PostDonationEntity[]> {
    return this.postDonationService.findAllForPost(id);
  }

  @Auth(JwtAuthGuard)
  @Get(':id')
  public async findById(@Param('id') id: PostEntity['id'], @Query() query?: string) {
    return this.postService.findOne(_.merge(deserializeQueryString(query), { where: { id } }));
  }

  @Auth(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  public async create(
    @Body() createPostDto: CreatePostDto,
    @AuthenticatedUser() authenticatedUser: UserPublicEntity,
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
    if (authenticatedUser.id !== createPostDto.authorId) {
      throw new ForbiddenException(
        'This action is forbiden for user. Author id must be equal to the authenticated user id',
      );
    }

    return this.postService.create(createPostDto, files);
  }

  @Post(':id/donations')
  public async createDonation(
    @Param('id') id: PostEntity['id'],
    @Body() createPostDonationDto: CreatePostDonationDto,
  ): Promise<PostDonationEntity> {
    return this.postDonationService.create(id, createPostDonationDto);
  }

  @Auth(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 1 }]))
  public async update(
    @Param('id') id: PostEntity['id'],
    @Body() updatePostDto: UpdatePostDto,
    @AuthenticatedUser() authenticatedUser: UserPublicEntity,
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
    const post = await this.postService.findOne({ where: { id } });

    if (post.authorId !== authenticatedUser.id) {
      throw new ForbiddenException(
        'This action is forbiden for user. Author id must be equal to the authenticated user id',
      );
    }

    return this.postService.update(id, updatePostDto, files);
  }

  @Auth(JwtAuthGuard)
  @Delete(':id')
  public async remove(
    @Param('id') id: PostEntity['id'],
    @AuthenticatedUser() authenticatedUser: UserPublicEntity,
  ): Promise<PostEntity> {
    const post = await this.postService.findOne({ where: { id } });

    if (post.authorId !== authenticatedUser.id) {
      throw new ForbiddenException(
        'This action is forbiden for user. Author id must be equal to the authenticated user id',
      );
    }

    return this.postService.remove(id);
  }
}
