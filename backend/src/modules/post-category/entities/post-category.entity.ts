import { PostCategory } from '@prisma/client';
import {
  IsDate,
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Matches,
  MaxDate,
  MaxLength,
} from 'class-validator';
import { PostEntity } from 'src/modules/post/entities/post.entity';

export class PostCategoryEntity implements PostCategory {
  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  id: number;

  @Matches(/^[a-zA-Z_0-9 ]+$/)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;

  @IsDate()
  @MaxDate(new Date())
  createdAt: Date;

  @IsDate()
  @MaxDate(new Date())
  updatedAt: Date;

  posts?: PostEntity[];
}
