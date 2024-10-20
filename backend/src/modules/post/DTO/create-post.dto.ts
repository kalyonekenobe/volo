import { Decimal } from '@prisma/client/runtime/library';
import { Type } from 'class-transformer';
import {
  IsUUID,
  IsNotEmpty,
  IsDefined,
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

export class CreatePostDto
  implements
    Pick<PostEntity, 'authorId' | 'title' | 'content' | 'fundsToBeRaised'>,
    Pick<Partial<PostEntity>, 'deadline' | 'isDraft'>
{
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  authorId: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  @IsDefined()
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(300)
  @IsDefined()
  content: string;

  @IsDecimal()
  @IsDefined()
  @Type(() => Decimal)
  fundsToBeRaised: Decimal;

  @IsDate()
  @MinDate(new Date())
  @Type(() => Date)
  @ValidateIf((_, value) => value)
  deadline?: Date | null;

  @IsBoolean()
  @ValidateIf((_, value) => value)
  isDraft?: boolean;
}
