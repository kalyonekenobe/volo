import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRegistrationMethodDto } from './DTO/create-user-registration-method.dto';
import { UpdateUserRegistrationMethodDto } from './DTO/update-user-registration-method.dto';
import { UserRegistrationMethodEntity } from './entities/user-registration-method.entity';
import { Prisma } from '@prisma/client';
import { UserRegistrationMethods } from 'src/core/enums/app.enums';

@Injectable()
export class UserRegistrationMethodService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(
    options?: Prisma.UserRegistrationMethodFindManyArgs,
  ): Promise<UserRegistrationMethodEntity[]> {
    if (options) {
      return this.prismaService.userRegistrationMethod.findMany(options);
    }

    return this.prismaService.userRegistrationMethod.findMany();
  }

  public async findOne(
    options: Prisma.UserRegistrationMethodFindUniqueOrThrowArgs,
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.findUniqueOrThrow(options);
  }

  public async create(
    data: CreateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.create({ data });
  }

  public async update(
    id: UserRegistrationMethodEntity['id'],
    data: UpdateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.update({ data, where: { id } });
  }

  public async remove(
    id: UserRegistrationMethodEntity['id'],
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.delete({ where: { id } });
  }
}
