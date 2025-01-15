import { Injectable } from '@nestjs/common';
import { StripeConfigService } from '../config/stripe.config';

@Injectable()
export class StripeService {
  constructor(private readonly stripeConfigService: StripeConfigService) {}

  async createPaymentIntent(amount: number, currency: string) {
    const stripe = this.stripeConfigService.getStripeInstance();
    return await stripe.paymentIntents.create({
      amount,
      currency,
    });
  }
}
