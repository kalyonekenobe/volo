import { Inject, Injectable } from '@nestjs/common';
import { MODULE_OPTIONS_TOKEN } from 'src/modules/stripe/stripe.module-definition';
import { StripeModuleOptions } from 'src/modules/stripe/types/stripe.types';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  public readonly stripe: Stripe;

  constructor(@Inject(MODULE_OPTIONS_TOKEN) private readonly options: StripeModuleOptions) {
    this.stripe = new Stripe(this.options.stripeApiKey, this.options.options);
  }
}
