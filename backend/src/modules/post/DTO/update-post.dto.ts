import { Decimal } from '@prisma/client/runtime/library';
import { Transform, Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsString,
  ValidateIf,
  MinDate,
  IsDecimal,
  Validate,
} from 'class-validator';
import { DecimalMin } from 'src/core/decorators/decimal-min.decorator';
import { CreateCategoryToPostDto } from 'src/modules/category-to-post/DTO/create-category-to-post.dto';
import { PostEntity } from 'src/modules/post/entities/post.entity';

export class UpdatePostDto
  implements
    Pick<
      Partial<PostEntity>,
      'title' | 'content' | 'fundsToBeRaised' | 'deadline' | 'image' | 'isDraft'
    >
{
  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  title?: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  content?: string;

  @Transform(value => new Decimal(value.value))
  @Validate(DecimalMin, [0.01])
  @IsDecimal()
  @Transform(value => value.value.toString())
  @ValidateIf((_, value) => value)
  fundsToBeRaised?: Decimal;

  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  @ValidateIf((_, value) => value)
  deadline?: Date | null;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  image?: string | null;

  @IsBoolean()
  @Type(() => Boolean)
  @ValidateIf((_, value) => value)
  isDraft?: boolean;

  @ValidateIf((_, value) => value)
  categories?: Pick<CreateCategoryToPostDto, 'categoryId'>[];
}
