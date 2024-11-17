import { CategoryToPost } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  MaxDate,
} from 'class-validator';
import { PostCategoryEntity } from 'src/modules/post-category/entities/post-category.entity';
import { PostEntity } from 'src/modules/post/entities/post.entity';

export class CategoryToPostEntity implements CategoryToPost {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  postId: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  categoryId: number;

  @IsDate()
  @MaxDate(new Date())
  createdAt: Date;

  @IsDate()
  @MaxDate(new Date())
  updatedAt: Date;

  post?: PostEntity;

  postCategory?: PostCategoryEntity;
}
