import { Body, Controller, Post } from '@nestjs/common';
import { Auth } from 'src/core/decorators/auth.decorator';
import { Routes } from 'src/core/enums/app.enums';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
import { ChargeDto } from 'src/modules/payment/DTO/charge.dto';
import { PaymentService } from 'src/modules/payment/payment.service';
import { PaymentChargeResponse } from 'src/modules/payment/types/payment.types';

@Controller(Routes.Payments)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Auth(JwtAuthGuard)
  @Post('charge')
  public async charge(@Body() chargeDto: ChargeDto): Promise<PaymentChargeResponse> {
    return this.paymentService.charge(chargeDto);
  }
}
