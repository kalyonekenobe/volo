import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { PasswordService } from '../password/password.service';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UserPublicEntity } from './entities/user-public.entity';
import { UpdateUserDto } from './DTO/update-user.dto';
import * as _ from 'lodash';
import { Routes } from 'src/core/enums/app.enums';
import { Prisma } from '@prisma/client';
import {
  CreateUserUploadedFiles,
  UpdateUserUploadedFiles,
} from 'src/modules/user/types/user.types';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async findAll(options?: Prisma.UserFindManyArgs): Promise<UserPublicEntity[]> {
    return this.prismaService.user.findMany(
      _.merge(options, { omit: { password: true, refreshToken: true } }),
    );
  }

  public async findOne(options: Prisma.UserFindFirstOrThrowArgs): Promise<UserPublicEntity> {
    return this.prismaService.user.findFirstOrThrow(
      _.merge(options, { omit: { password: true, refreshToken: true } }),
    );
  }

  public async create(data: CreateUserDto, files?: CreateUserUploadedFiles) {
    if (data.password) {
      data.password = await this.passwordService.hash(data.password);
    }

    return this.prismaService.user
      .create({
        data,
        omit: { password: true, refreshToken: true },
      })
      .then(user => {
        if (files?.image?.length) {
          const image = files?.image[0];
          const filename = `${Routes.Users}/${uuid()}${path.extname(image.originalname)}`;

          this.supabaseService.upload(image, filename).then(async response => {
            if (response.file.filename) {
              await this.prismaService.user.update({
                where: { id: user.id },
                data: { image: response.file.filename },
              });
            }
          });
        }

        return user;
      });
  }

  public async update(
    id: UserPublicEntity['id'],
    data: UpdateUserDto,
    files?: UpdateUserUploadedFiles,
  ): Promise<UserPublicEntity> {
    if (data.password) {
      data.password = await this.passwordService.hash(data.password);
    }

    const { image: imageInDto, ...dataWithoutImage } = data;

    return this.prismaService.user
      .update({
        data: dataWithoutImage,
        where: { id },
        omit: { password: true, refreshToken: true },
      })
      .then(async user => {
        const image = files?.image?.[0];

        if (imageInDto === 'null') {
          await this.prismaService.user.update({
            where: { id: user.id },
            data: { image: null },
          });

          if (user.image) {
            this.supabaseService.remove([user.image]);
          }

          return user;
        }

        if (image) {
          const filename = `${Routes.Users}/${uuid()}${path.extname(image.originalname)}`;

          this.supabaseService.upload(image, filename).then(async response => {
            if (response.file.filename) {
              await this.prismaService.user.update({
                where: { id: user.id },
                data: { image: response.file.filename },
              });

              if (user.image) {
                this.supabaseService.remove([user.image]);
              }
            }
          });
        }

        return user;
      });
  }

  public async remove(id: UserPublicEntity['id']): Promise<UserPublicEntity> {
    return this.prismaService.user
      .delete({
        where: { id },
        omit: { password: true, refreshToken: true },
      })
      .then(async user => {
        if (user.image) {
          this.supabaseService.remove([user.image]);
        }

        return user;
      });
  }
}
