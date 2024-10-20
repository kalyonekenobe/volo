import { Post } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import {
  IsUUID,
  IsNotEmpty,
  IsDefined,
  IsString,
  MaxLength,
  MinLength,
  IsDecimal,
  IsDate,
  MaxDate,
  ValidateIf,
  IsBoolean,
  MinDate,
} from 'class-validator';
import { UserPublicEntity } from 'src/modules/user/entities/user-public.entity';

export class PostEntity implements Post {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

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
  deadline: Date | null;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(300)
  @ValidateIf((_, value) => value)
  image: string | null;

  @IsBoolean()
  @IsDefined()
  isDraft: boolean;

  @IsDate()
  @MaxDate(new Date())
  createdAt: Date;

  @IsDate()
  @MaxDate(new Date())
  updatedAt: Date;

  @IsDate()
  @MaxDate(new Date())
  @ValidateIf((_, value) => value)
  removedAt: Date | null;

  @IsDecimal()
  @IsDefined()
  currentlyRaisedFunds?: Decimal;

  author?: UserPublicEntity;
}
