import { Module } from '@nestjs/common';
import { CategoryToPostController } from 'src/modules/category-to-post/category-to-post.controller';
import { CategoryToPostService } from 'src/modules/category-to-post/category-to-post.service';

@Module({
  controllers: [CategoryToPostController],
  providers: [CategoryToPostService],
})
export class CategoryToPostModule {}
