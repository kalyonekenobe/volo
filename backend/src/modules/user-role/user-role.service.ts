import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserRoleDto } from './DTO/create-user-role.dto';
import { UpdateUserRoleDto } from './DTO/update-user-role.dto';
import { UserRoleEntity } from './entities/user-role.entity';
import { Prisma } from '@prisma/client';
import { UserRoles } from 'src/core/enums/app.enums';

@Injectable()
export class UserRoleService {
  constructor(private readonly prismaService: PrismaService) {}

  public async findAll(options?: Prisma.UserRoleFindManyArgs): Promise<UserRoleEntity[]> {
    if (options) {
      return this.prismaService.userRole.findMany(options);
    }

    return this.prismaService.userRole.findMany();
  }

  public async findOne(options: Prisma.UserRoleFindUniqueOrThrowArgs): Promise<UserRoleEntity> {
    return this.prismaService.userRole.findUniqueOrThrow(options);
  }

  public async create(data: CreateUserRoleDto): Promise<UserRoleEntity> {
    return this.prismaService.userRole.create({ data });
  }

  public async update(id: UserRoleEntity['id'], data: UpdateUserRoleDto): Promise<UserRoleEntity> {
    return this.prismaService.userRole.update({ data, where: { id } });
  }

  public async remove(id: UserRoleEntity['id']): Promise<UserRoleEntity> {
    return this.prismaService.userRole.delete({ where: { id } });
  }
}
