import { Module } from '@nestjs/common';
import { PostCategoryController } from 'src/modules/post-category/post-category.controller';
import { PostCategoryService } from 'src/modules/post-category/post-category.service';

@Module({
  controllers: [PostCategoryController],
  providers: [PostCategoryService],
})
export class PostCategoryModule {}
