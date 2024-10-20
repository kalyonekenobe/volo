import { Decimal } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsBoolean,
  IsDate,
  IsDecimal,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
  MinDate,
} from 'class-validator';
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
  @MinLength(3)
  @MaxLength(100)
  @ValidateIf((_, value) => value)
  title?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(300)
  @ValidateIf((_, value) => value)
  content?: string;

  @IsDecimal()
  @Type(() => Decimal)
  @ValidateIf((_, value) => value)
  fundsToBeRaised?: Decimal;

  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  @ValidateIf((_, value) => value)
  deadline?: Date | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(300)
  @ValidateIf((_, value) => value)
  image?: string | null;

  @IsBoolean()
  @Type(() => Boolean)
  @ValidateIf((_, value) => value)
  isDraft?: boolean;
}
