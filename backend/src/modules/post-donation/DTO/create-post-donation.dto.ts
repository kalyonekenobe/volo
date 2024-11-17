import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsDecimal, IsDefined, IsJSON, IsNotEmpty, IsString, Validate } from 'class-validator';
import { PostDonationEntity } from '../entities/post-donation.entity';
import { DecimalMin } from 'src/core/decorators/decimal-min.decorator';
import { Prisma } from '@prisma/client';

export class CreatePostDonationDto implements Pick<PostDonationEntity, 'donation' | 'metadata'> {
  @IsNotEmpty()
  @IsDefined()
  metadata: Prisma.JsonValue;

  @Transform(value => new Decimal(value.value))
  @Validate(DecimalMin, [0.01])
  @IsDecimal()
  @IsDefined()
  @Transform(value => value.value.toString())
  donation: Decimal;
}
