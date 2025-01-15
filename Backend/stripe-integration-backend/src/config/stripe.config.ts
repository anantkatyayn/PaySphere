import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeConfigService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-12-18.acacia',
    });
  }

  getStripeInstance(): Stripe {
    return this.stripe;
  }
}
