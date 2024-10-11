import { Post } from '@prisma/client';
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
  MaxDate,
  MaxLength,
  MinLength,
  ValidateIf,
  MinDate,
} from 'class-validator';

export class CreatePostDto
  implements Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'removedAt' | 'image'>
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
  @ValidateIf((_, value) => value)
  @Type(() => Date)
  deadline: Date | null;

  @IsBoolean()
  @IsDefined()
  @Type(() => Boolean)
  isDraft: boolean;
}
