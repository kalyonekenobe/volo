import { Decimal } from '@prisma/client/runtime/library';
import { Transform } from 'class-transformer';
import { IsDecimal, IsJSON, Validate, ValidateIf } from 'class-validator';
import { PostDonationEntity } from '../entities/post-donation.entity';
import { DecimalMin } from 'src/core/decorators/decimal-min.decorator';
import { Prisma } from '@prisma/client';

export class UpdatePostDonationDto
  implements Pick<Partial<PostDonationEntity>, 'donation' | 'metadata'>
{
  @ValidateIf((_, value) => value)
  metadata?: Prisma.JsonValue;

  @Transform(value => new Decimal(value.value))
  @Validate(DecimalMin, [0.01])
  @IsDecimal()
  @Transform(value => value.value.toString())
  @ValidateIf((_, value) => value)
  donation?: Decimal;
}
