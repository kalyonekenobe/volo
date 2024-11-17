import { Module } from '@nestjs/common';
import { CategoryToPostModule } from 'src/modules/category-to-post/category-to-post.module';
import { PostCategoryModule } from 'src/modules/post-category/post-category.module';
import { PostDonationModule } from 'src/modules/post-donation/post-donation.module';
import { PostController } from 'src/modules/post/post.controller';
import { PostService } from 'src/modules/post/post.service';

@Module({
  imports: [PostCategoryModule, CategoryToPostModule, PostDonationModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
