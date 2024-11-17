import { Body, Controller, Delete, Get, Param, Put, Query } from '@nestjs/common';
import { Auth } from 'src/core/decorators/auth.decorator';
import * as _ from 'lodash';
import { deserializeQueryString } from 'src/core/utils/url.utils';
import { Routes } from 'src/core/enums/app.enums';
import { PostDonationService } from 'src/modules/post-donation/post-donation.service';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { UpdatePostDonationDto } from 'src/modules/post-donation/DTO/update-post-donation.dto';
import { PostDonationEntity } from 'src/modules/post-donation/entities/post-donation.entity';

@Controller(Routes.PostDonations)
export class PostDonationController {
  constructor(private readonly postDonationService: PostDonationService) {}

  @Auth(JwtAuthGuard)
  @Get(':id')
  public async findById(
    @Param('id') id: PostDonationEntity['id'],
    @Query() query?: string,
  ): Promise<PostDonationEntity> {
    return this.postDonationService.findOne(
      _.merge(deserializeQueryString(query), { where: { id } }),
    );
  }

  @Auth(JwtAuthGuard)
  @Put(':id')
  public async update(
    @Param('id') id: PostDonationEntity['id'],
    @Body() updatePostDonationDto: UpdatePostDonationDto,
  ): Promise<PostDonationEntity> {
    return this.postDonationService.update(id, updatePostDonationDto);
  }

  @Auth(JwtAuthGuard)
  @Delete(':id')
  public async remove(@Param('id') id: PostDonationEntity['id']): Promise<PostDonationEntity> {
    return this.postDonationService.remove(id);
  }
}
