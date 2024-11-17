import { Decimal } from '@prisma/client/runtime/library';
import { Transform, Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsDefined,
  IsBoolean,
  IsDate,
  IsString,
  ValidateIf,
  MinDate,
  Validate,
  IsDecimal,
} from 'class-validator';
import { DecimalMin } from 'src/core/decorators/decimal-min.decorator';
import { CreateCategoryToPostDto } from 'src/modules/category-to-post/DTO/create-category-to-post.dto';
import { PostEntity } from 'src/modules/post/entities/post.entity';

export class CreatePostDto
  implements
    Pick<PostEntity, 'authorId' | 'title' | 'content' | 'fundsToBeRaised'>,
    Pick<Partial<PostEntity>, 'deadline' | 'isDraft' | 'image'>
{
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  content: string;

  @Transform(value => new Decimal(value.value))
  @Validate(DecimalMin, [0.01])
  @IsDecimal()
  @IsDefined()
  @Transform(value => value.value.toString())
  fundsToBeRaised: Decimal;

  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  @ValidateIf((_, value) => value)
  deadline?: Date | null;

  @IsBoolean()
  @ValidateIf((_, value) => value)
  isDraft?: boolean;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((_, value) => value)
  image?: string | null;

  @ValidateIf((_, value) => value)
  categories?: Pick<CreateCategoryToPostDto, 'categoryId'>[];
}
