import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  ValidateIf,
} from 'class-validator';
import { ChargePayload } from 'src/modules/payment/types/payment.types';

export class ChargeDto implements ChargePayload {
  @IsNumber()
  @Min(0.01)
  @IsDefined()
  @IsNotEmpty()
  amount: number;

  @MaxLength(255)
  @IsString()
  @ValidateIf((_, value) => value)
  paymentMethodId?: string;

  @MaxLength(255)
  @IsString()
  @ValidateIf((_, value) => value)
  customerId?: string;
}
