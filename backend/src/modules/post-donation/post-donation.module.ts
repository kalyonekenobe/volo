import { Module } from '@nestjs/common';
import { PaymentModule } from 'src/modules/payment/payment.module';
import { PostDonationController } from 'src/modules/post-donation/post-donation.controller';
import { PostDonationService } from 'src/modules/post-donation/post-donation.service';

@Module({
  imports: [PaymentModule],
  controllers: [PostDonationController],
  providers: [PostDonationService],
  exports: [PostDonationService],
})
export class PostDonationModule {}
