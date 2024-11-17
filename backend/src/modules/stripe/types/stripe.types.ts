import Stripe from 'stripe';

export interface StripeModuleOptions {
  stripeApiKey: string;
  options: Stripe.StripeConfig;
}
