import { IsString, Matches, MaxLength, ValidateIf } from 'class-validator';
import { PostCategoryEntity } from 'src/modules/post-category/entities/post-category.entity';

export class UpdatePostCategoryDto implements Pick<Partial<PostCategoryEntity>, 'name'> {
  @Matches(/^[a-zA-Z_0-9 ]+$/)
  @MaxLength(50)
  @IsString()
  @ValidateIf((_, value) => value)
  name?: string;
}
