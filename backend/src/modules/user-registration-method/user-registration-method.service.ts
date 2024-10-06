import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRegistrationMethodDto } from './dto/create-user-registration-method.dto';
import { UpdateUserRegistrationMethodDto } from './dto/update-user-registration-method.dto';
import { UserRegistrationMethodEntity } from './entity/user-registration-method.entity';

@Injectable()
export class UserRegistrationMethodService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(
    data: CreateUserRegistrationMethodDto,
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.create({ data });
  }

  public async findAll(): Promise<UserRegistrationMethodEntity[]> {
    return this.prismaService.userRegistrationMethod.findMany();
  }

  public async findOneById(
    id: UserRegistrationMethodEntity['id'],
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  public async updateOneById(
    data: UpdateUserRegistrationMethodDto,
    id: UserRegistrationMethodEntity['id'],
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.update({
      data,
      where: {
        id,
      },
    });
  }

  public async deleteOneById(
    id: UserRegistrationMethodEntity['id'],
  ): Promise<UserRegistrationMethodEntity> {
    return this.prismaService.userRegistrationMethod.delete({
      where: {
        id,
      },
    });
  }
}
