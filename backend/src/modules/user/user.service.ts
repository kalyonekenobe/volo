import { Injectable } from '@nestjs/common';
import * as path from 'path';
import { PasswordService } from '../password/password.service';
import { PrismaService } from '../prisma/prisma.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuid } from 'uuid';
import { UserPublicEntity } from './entity/user-public.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import _ from 'lodash';
import { Routes } from 'src/core/enums/app.enums';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly supabaseService: SupabaseService,
  ) {}

  public async create(data: CreateUserDto, avatar?: Express.Multer.File) {
    if (data.password) {
      data.password = await this.passwordService.hash(data.password);
    }

    return this.prismaService.user
      .create({
        data,
        omit: { password: true, refreshToken: true },
      })
      .then(user => {
        if (avatar) {
          const filename = `${Routes.Users}/${uuid()}${path.extname(avatar.originalname)}`;

          this.supabaseService.upload(avatar, filename).then(async response => {
            if (response.file.filename) {
              await this.prismaService.user.update({
                where: { id: user.id },
                data: { image: response.file.filename },
              });
            }
          });
        }
      });
  }

  public async findAll(): Promise<UserPublicEntity[]> {
    return this.prismaService.user.findMany({
      omit: { password: true, refreshToken: true },
    });
  }

  public async findById(id: UserPublicEntity['id']): Promise<UserPublicEntity> {
    return this.prismaService.user.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  public async update(
    id: UserPublicEntity['id'],
    data: UpdateUserDto,
    avatar?: Express.Multer.File,
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

        if (avatar) {
          const filename = `${Routes.Users}/${uuid()}${path.extname(avatar.originalname)}`;

          this.supabaseService.upload(avatar, filename).then(async response => {
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

  public async deleteById(id: UserPublicEntity['id']): Promise<UserPublicEntity> {
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
