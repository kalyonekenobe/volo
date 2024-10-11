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
  MaxLength,
  MinLength,
  ValidateIf,
  MinDate,
} from 'class-validator';

export class UpdatePostDto implements Omit<Post, 'id' | 'createdAt' | 'updatedAt' | 'removedAt'> {
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
  fundsToBeRaised: Decimal;

  @IsDate()
  @MinDate(new Date())
  @ValidateIf((_, value) => value)
  @Type(() => Date)
  deadline: Date | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(300)
  @ValidateIf((_, value) => value)
  image: string | null;

  @IsBoolean()
  @IsDefined()
  @Type(() => Boolean)
  isDraft: boolean;
}
