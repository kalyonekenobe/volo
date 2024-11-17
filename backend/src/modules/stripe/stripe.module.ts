import { Global, Module } from '@nestjs/common';
import { ConfigurableModuleClass } from 'src/modules/stripe/stripe.module-definition';
import { StripeService } from 'src/modules/stripe/stripe.service';

@Global()
@Module({
  providers: [StripeService],
  exports: [StripeService],
})
export class StripeModule extends ConfigurableModuleClass {}
