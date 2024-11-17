import { IsDefined, IsNotEmpty, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { CategoryToPostEntity } from 'src/modules/category-to-post/entities/category-to-post.entity';

export class CreateCategoryToPostDto
  implements Pick<CategoryToPostEntity, 'postId' | 'categoryId'>
{
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  postId: string;

  @IsPositive()
  @IsNumber()
  @IsNotEmpty()
  @IsDefined()
  categoryId: number;
}
