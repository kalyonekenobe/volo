import { PostDonation, Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDecimal,
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxDate,
  Validate,
} from 'class-validator';
import { DecimalMin } from 'src/core/decorators/decimal-min.decorator';
import { PostEntity } from 'src/modules/post/entities/post.entity';

export class PostDonationEntity implements PostDonation {
  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  id: string;

  @IsUUID()
  @IsNotEmpty()
  @IsDefined()
  postId: PostEntity['id'];

  @IsString()
  @IsNotEmpty()
  @IsDefined()
  metadata: Prisma.JsonValue;

  @Transform(value => new Decimal(value.value))
  @Validate(DecimalMin, [0.01])
  @IsDecimal()
  @IsDefined()
  @Transform(value => value.value.toString())
  donation: Decimal;

  @IsDate()
  @MaxDate(new Date())
  createdAt: Date;

  @IsDate()
  @MaxDate(new Date())
  updatedAt: Date;

  post?: PostEntity;
}
