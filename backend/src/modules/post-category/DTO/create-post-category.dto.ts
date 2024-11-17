import { IsDefined, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { PostCategoryEntity } from 'src/modules/post-category/entities/post-category.entity';

export class CreatePostCategoryDto implements Pick<PostCategoryEntity, 'name'> {
  @Matches(/^[a-zA-Z_0-9 ]+$/)
  @MaxLength(50)
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  name: string;
}
