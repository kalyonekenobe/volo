import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleEntity } from './entity/user-role.entity';


@Injectable()
export class UserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(data: CreateUserRoleDto): Promise<UserRoleEntity> {
    return this.prismaService.userRole.create({ data });
  }

  public async findAll(): Promise<UserRoleEntity[]> {
    return this.prismaService.userRole.findMany();
  }

  public async findOneById(id: UserRoleEntity['id']): Promise<UserRoleEntity> {
    return this.prismaService.userRole.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
  }

  public async updateOneById(
    data: UpdateUserRoleDto,
    id: UserRoleEntity['id'],
  ): Promise<UserRoleEntity> {
    return this.prismaService.userRole.update({
      data,
      where: {
        id: Number(id),
      },
    });
  }

  public async deleteOneById(id: UserRoleEntity['id']): Promise<UserRoleEntity> {
    return this.prismaService.userRole.delete({
      where: {
        id: Number(id),
      },
    });
  }
}
